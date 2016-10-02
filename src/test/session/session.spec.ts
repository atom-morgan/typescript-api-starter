import * as mongoose from 'mongoose';
import User from '../../models/user';
import server from '../../index';

describe('Session', () => {
  beforeEach((done) => {
    User.remove({}, (err) => {
      done();
    });
  });

  beforeEach((done) => {
    User.create({ username: 'adam', password: 'password' }, (err, user) => {
      done();
    });
  })

  describe('POST Session', () => {
    let validUser = { username: 'adam', password: 'password' };
    let invalidUser = { username: 'wrong', password: 'wrong' };
    let invalidPassword = { username: 'adam', password: 'wrong' };

    it('should return a token with a valid username and password', (done) => {
      chai.request(server)
        .post('/api/sessions')
        .send(validUser)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('token');
          done();
        });
    });

    it('should return an error with an invalid username', (done) => {
      chai.request(server)
        .post('/api/sessions')
        .send(invalidUser)
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.have.property('error');
          res.body.error.should.eql('User could not be found');
          done();
        });
    })

    it('should return an error with an invalid password', (done) => {
      chai.request(server)
        .post('/api/sessions')
        .send(invalidPassword)
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.have.property('error');
          res.body.error.should.eql('Incorrect password');
          done();
        });
    });
  });

  afterEach((done) => {
    User.remove({}, (err) => {
      done();
    });
  });
});