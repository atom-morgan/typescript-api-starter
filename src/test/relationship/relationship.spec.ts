import User from '../../models/user';
import Relationship from '../../models/relationship';
import server from '../../index';
import Utils from '../utils';

describe('Relationship', () => {
  let follower = {};
  let followed = {};

  before(() => {
    return Promise.all([
      User.remove({}),
      Relationship.remove({})
    ]);
  });

  describe('POST Relationship', () => {
    before(() => {
      let userObj = { username: 'adam', password: 'password' };
      return Utils.createUserAndToken(userObj).spread((user, session) => {
        follower.user = user;
        follower.token = session.token;
      });
    });

    before(() => {
      let userObj = { username: 'elonmusk', password: 'password' };
      return Utils.createUserAndToken(userObj).spread((user, session) => {
        followed.user = user;
        followed.token = session.token;
      });
    });

    it('should return a relationship object for two valid users with updated follower/following counts', () => {
      let payload = { followerId: follower.user._id, followedId: followed.user._id };

      return chai.request(server)
        .post('/api/relationships')
        .set('Authorization', follower.token)
        .send(payload)
        .then((res) => {
          User.find()
          .where('_id')
          .in([follower.user._id, followed.user._id])
          .exec()
          .then((user) => {
            res.should.have.status(200);
            res.body.followerId.should.equal(follower.user._id);
            res.body.followedId.should.equal(followed.user._id);
            user[0].followingCount.should.equal(follower.user.followingCount + 1);
            user[1].followerCount.should.equal(followed.user.followerCount + 1);
          });
        });
    });
  });

  after(() => {
    return Promise.all([
      User.remove({}),
      Relationship.remove({})
    ]);
  });
});
