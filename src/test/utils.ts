import server from '../index';
import Promise = require('bluebird');

const userCredentials = { username: 'johndoe', password: 'password' };

const createUserAndGetToken = function() {
  return createUser().then(loginUser);
};

function createUser() {
  return new Promise((resolve, reject) => {
    chai.request(server)
      .post('/api/users')
      .send(userCredentials)
      .end((err, res) => {
        return resolve(res.body);
      });
  });
}

function loginUser() {
  return new Promise((resolve, reject) => {
    chai.request(server)
      .post('/api/sessions')
      .send(userCredentials)
      .end((err, res) => {
        return resolve(res.body);
      });
  });
}

export default { createUserAndGetToken };