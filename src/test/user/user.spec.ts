import User from '../../models/user';
import server from '../../index';
import Utils from '../utils';

describe('User', () => {
  before(() => {
    return User.remove({});
  });

  describe('GET User', () => {
    let token;

    before(() => {
      return Utils.getUserAndToken().spread((user, session) => {
        token = session.token;
      });
    });

    it('should get a response', () => {
      return chai.request(server)
        .get('/api/users')
        .set('Authorization', token)
        .then((res) => {
          res.should.have.status(200);
          res.body.message.should.eql('GET Users Controller!');
        });
    });
  });

  describe('POST User', () => {
    before(() => {
      let user = new User({
        username: 'duplicate',
        password: 'password'
      });
      return user.save();
    });

    it('should return a user object with a valid username and password', () => {
      let user = { username: 'testuser', password: 'password' };

      return chai.request(server)
        .post('/api/users')
        .send(user)
        .then((res) => {
          res.should.have.status(200);
          res.body.should.have.property('_id');
          res.body.username.should.eql(user.username);
        });
    });

    it('should return an error for a username that already exists', () => {
      let user = { username: 'duplicate', password: 'password' };

      return chai.request(server)
        .post('/api/users')
        .send(user)
        .catch((err) => {
          err.should.have.status(500);
          err.response.body.should.have.property('error');
        });
    });
  });

  after(() => {
    return User.remove({});
  });
});