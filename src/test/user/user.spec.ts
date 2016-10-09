import * as mongoose from 'mongoose';
import User from '../../models/user';
import server from '../../index';
import Utils from '../utils';

describe('User', () => {
  beforeEach(() => {
    return User.remove({});
  });

  describe('GET User', () => {
    let token;

    beforeEach(() => {
      return Utils.createUserAndGetToken().then((res) => {
        token = res.token;
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
    })
  });

  afterEach(() => {
    return User.remove({});
  });
});