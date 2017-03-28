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

  describe('GET Relationship', () => {
    it('should return a 404 for a relationship that does not exist', () => {
      let payload = { followerId: follower.user._id, followedId: followed.user._id };
      return chai.request(server)
        .get('/api/relationships/' + payload.followerId + '/following/' + payload.followedId)
        .set('Authorization', follower.token)
        .catch((err) => {
          err.should.have.status(404);
          err.response.body.message.should.equal('This relationship does not exist!');
        });
    });
  });

  describe('POST Relationship', () => {
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

    it('should return an error object for an existing relationship', () => {
      let payload = { followerId: follower.user._id, followedId: followed.user._id };

      return chai.request(server)
        .post('/api/relationships')
        .set('Authorization', follower.token)
        .send(payload)
        .catch((err) => {
          err.should.have.status(500);
          err.response.body.message.should.equal('This relationship already exists!');
        });
    });
  });

  describe('GET Relationship', () => {
    it('should return a relationship object for a relationship that exists', () => {
      let payload = { followerId: follower.user._id, followedId: followed.user._id };
      return chai.request(server)
        .get('/api/relationships/' + payload.followerId + '/following/' + payload.followedId)
        .set('Authorization', follower.token)
        .then((res) => {
          res.should.have.status(200);
          res.body.followerId.should.equal(payload.followerId);
          res.body.followedId.should.equal(payload.followedId);
        });
    });
  });

  describe('DELETE Relationship ', () => {
    it('should return an error for a relationship that does not exist', () => {
      // Follower and followed are identical
      let payload = { followerId: follower.user._id, followedId: follower.user._id };

      return chai.request(server)
        .del('/api/relationships/' + payload.followerId + '/following/' + payload.followedId)
        .set('Authorization', follower.token)
        .catch((err) => {
          err.should.have.status(404);
          err.response.body.should.have.property('resource');
          err.response.body.should.have.property('message');
        });
    });

    it('should destroy a valid relationship object with updated follower/following counts', () => {
      let payload = { followerId: follower.user._id, followedId: followed.user._id };

      return chai.request(server)
        .del('/api/relationships/' + payload.followerId + '/following/' + payload.followedId)
        .set('Authorization', follower.token)
        .then((res) => {
          User.find()
            .where('_id')
            .in([follower.user._id, followed.user._id])
            .exec()
            .then((user) => {
              res.should.have.status(200);
              res.body.should.have.property('message');
              user[0].followingCount.should.equal(follower.user.followingCount);
              user[1].followerCount.should.equal(followed.user.followerCount);
            });
        });
    });

    it('should return a 500 when a relationship cannot be destroyed', () => {
      let payload = { followerId: follower.user._id, followedId: 12345 };
      return chai.request(server)
        .del('/api/relationships/' + payload.followerId + '/following/' + payload.followedId)
        .set('Authorization', follower.token)
        .catch((err) => {
          err.should.have.status(500);
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
