import Post from '../../models/post';
import Utils from '../utils';
import server from '../../index';

describe('Post', () => {
  let post;

  before(() => {
    return Post.remove({});
  });

  describe('POST Post', () => {
    let token;
    let myUser;

    beforeEach(() => {
      return Utils.getUserAndToken().spread((user, session) => {
        myUser = user;
        // console.log('myUser ', myUser);
        token = session.token;
      });
    });

    it('should return a Post object', () => {
      let payload = {
        _creator: myUser._id,
        title: 'Ask me anything!',
        description: 'Seriously, anything.',
        endTime: new Date()
      };

      return chai.request(server)
        .post('/api/posts')
        .set('Authorization', token)
        .send(payload)
        .then((res) => {
          post = res.body;
          res.should.have.status(200);
          res.body._creator.should.equal(myUser._id);
          res.body.should.have.property('title');
          res.body.should.have.property('description');
        });
    });
  });

  describe('GET Post', () => {
    it('should return a Post object when queried with a given ID', () => {
      return chai.request(server)
        .get('/api/posts/' + post._id)
        .then((res) => {
          res.should.have.status(200);
          res.body._id.should.equal(post._id);
        });
    });
  });

  after(() => {
    return Post.remove({});
  });
});
