import User from '../../models/user';
import server from '../../index';
import Utils from '../utils';

describe('User', () => {
  before(() => {
    return User.remove({});
  });

  describe('GET User', () => {
    let myUser;

    before(() => {
      return Utils.getUserAndToken().spread((user, session) => {
        myUser = user;
      });
    });

    it('should return a User object with a valid username', () => {
      return chai.request(server)
        .get('/api/users/' + myUser.username)
        .then((res) => {
          res.should.have.status(200);
          res.body.username.should.eql(myUser.username);
        });
    });

    it('should return a 404 with an invalid username', () => {
      return chai.request(server)
        .get('/api/users/' + 'missingno')
        .catch((err) => {
          err.should.have.status(404);
          err.response.body.should.have.property('resource');
          err.response.body.should.have.property('message');
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

    it('should return an error with a password that is too short', () => {
      let user = { username: 'testuser', password: 'abc' };

      return chai.request(server)
        .post('/api/users')
        .send(user)
        .catch((err) => {
          err.should.have.status(500);
          err.response.body.should.have.property('error');
        });
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
