import * as mongoose from 'mongoose';
import User from '../../models/user';
import server from '../../index';

describe('User', () => {
  beforeEach((done) => {
    User.remove({}, (err) => {
      done();
    });
  });

  describe('GET User', () => {
    it('should get a response', (done) => {
      chai.request(server)
        .get('/api/users')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.eql('GET Users Controller!');
          done();
        });
    });
  });
});