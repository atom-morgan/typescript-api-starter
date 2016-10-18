import User from '../../models/user';
import server from '../../index';

describe('Session', () => {
  before(() => {
    return User.remove({});
  });

  before(() => {
    return User.create({ username: 'adam', password: 'password' });
  });

  describe('POST Session', () => {
    let validUser = { username: 'adam', password: 'password' };
    let invalidUser = { username: 'wrong', password: 'wrong' };
    let invalidPassword = { username: 'adam', password: 'wrong' };

    it('should return a token with a valid username and password', () => {
      return chai.request(server)
        .post('/api/sessions')
        .send(validUser)
        .then((res) => {
          res.should.have.status(200);
          res.body.should.have.property('token');
        });
    });

    it('should return an error with an invalid username', () => {
      return chai.request(server)
        .post('/api/sessions')
        .send(invalidUser)
        .catch((err) => {
          err.response.should.have.status(404);
          err.response.body.should.have.property('error');
          err.response.body.error.should.eql('User could not be found');
        });
    });

    it('should return an error with an invalid password', () => {
      return chai.request(server)
        .post('/api/sessions')
        .send(invalidPassword)
        .catch((err) => {
          err.response.should.have.status(500);
          err.response.body.should.have.property('error');
          err.response.body.error.should.eql('Incorrect password');
        });
    });
  });

  after(() => {
    return User.remove({});
  });
});