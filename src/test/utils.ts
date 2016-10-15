import server from '../index';
import Promise = require('bluebird');

const userCredentials = { username: 'johndoe', password: 'password' };

const getUserAndToken = function() {
  return Promise.mapSeries([createUser, loginUser], (func) => {
    return func();
  });
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

export default { getUserAndToken };