import User from '../../models/user';
import Post from '../../models/post';
import Question from '../../models/question';
import Utils from '../utils';
import server from '../../index';

describe('Question', () => {
  let token;
  let myUser;
  let myPost;
  let myQuestion;

  before(() => {
    return Promise.all([
      User.remove({}),
      Post.remove({}),
      Question.remove({})
    ]);
  });

  before(() => {
    return Utils.getUserAndToken().spread((user, session) => {
      myUser = user;
      token = session.token;
    });
  });

  // TODO Move into utility function
  before(() => {
    let postPayload = {
      _creator: myUser._id,
      title: 'Test',
      description: 'test',
      endTime: new Date()
    };

    return chai.request(server)
      .post('/api/posts')
      .set('Authorization', token)
      .send(postPayload)
      .then((res) => {
        myPost = res.body;
      });
  });

  describe('POST Question', () => {
    it('should return a Question object with a valid payload', () => {
      let payload = {
        content: 'What is the meaning of life?',
        _creator: myUser._id,
        _post: myPost._id
      };

      return chai.request(server)
        .post('/api/questions')
        .set('Authorization', token)
        .send(payload)
        .then((res) => {
          myQuestion = res.body;
          res.should.have.status(200);
          res.body._creator.should.equal(myUser._id);
          res.body._post.should.equal(myPost._id);
        });
    });
  });

  describe('GET Question', () => {
    it('should get a Question object with a valid ID', () => {
      return chai.request(server)
        .get('/api/questions/' + myQuestion._id)
        .then((res) => {
          res.should.have.status(200);
          res.body._id.should.equal(myQuestion._id);
        });
    });

    it('should return a 404 with an invalid ID', () => {
      return chai.request(server)
        .get('/api/questions/' + 1337)
        .catch((err) => {
          err.should.have.status(404);
        });
    });
  });

  after(() => {
    return Promise.all([
      User.remove({}),
      Post.remove({}),
      Question.remove({})
    ]);
  });
});