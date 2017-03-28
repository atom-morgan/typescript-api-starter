import Post from '../../models/post';
import Utils from '../utils';
import server from '../../index';

describe('Post', () => {
  let myPost;
  let token;
  let myUser;

  before(() => {
    return Post.remove({});
  });

  describe('POST Post', () => {
    before(() => {
      return Utils.getUserAndToken().spread((user, session) => {
        myUser = user;
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
          myPost = res.body;
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
        .get('/api/posts/' + myPost._id)
        .then((res) => {
          res.should.have.status(200);
          res.body._id.should.equal(myPost._id);
        });
    });

    it('should return a list of Post objects for a given user', () => {
      return chai.request(server)
        .get('/api/posts/user/' + myUser._id)
        .then((res) => {
          res.should.have.status(200);
          res.body.should.have.length.of.at.least(0);
        });
    });

    it('should return a 404 when a list of Post objects doesn\'t exist for a given user', () => {
      return chai.request(server)
        .get('/api/posts/user/' + 123123123)
        .catch((err) => {
          err.should.have.status(404);
        });
    });

    it('should return a 404 when queried with an invalid ID', () => {
      return chai.request(server)
        .get('/api/posts/' + 1337)
        .catch((err) => {
          err.should.have.status(404);
        });
    });
  });

  after(() => {
    return Post.remove({});
  });
});
