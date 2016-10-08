import * as mongoose from 'mongoose';
import User from '../../models/user';
import server from '../../index';
import Utils from '../utils';

describe('User', () => {
  beforeEach((done) => {
    User.remove({}, (err) => {
      done();
    });
  });

  describe('GET User', () => {
    let token;

    beforeEach((done) => {
      Utils.createUserAndGetToken()
      .then((res) => {
        token = res.token;
        done();
      });
    });

    it('should get a response', (done) => {
      chai.request(server)
        .get('/api/users')
        .set('Authorization', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.eql('GET Users Controller!');
          done();
        });
    });
  });

  describe('POST User', () => {
    it('should return a user object with a valid username and password', (done) => {
      let user = { username: 'testuser', password: 'password' };

      chai.request(server)
        .post('/api/users')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('_id');
          res.body.username.should.eql(user.username);
          done();
        });
    })
  });

  afterEach((done) => {
    User.remove({}, (err) => {
      done();
    });
  });
});