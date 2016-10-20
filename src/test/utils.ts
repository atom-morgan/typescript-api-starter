import server from '../index';
import Promise = require('bluebird');

const userCredentials = { username: 'johndoe', password: 'password' };

const getUserAndToken = function() {
  return Promise.mapSeries([createDummyUser, loginUser], (func) => {
    return func();
  });
};

const createUserAndToken = function(user) {
  return Promise.mapSeries([createCustomUser, loginCustomUser], (func) => {
    return func(user);
  });
};

function createCustomUser(user) {
  return new Promise((resolve, reject) => {
    chai.request(server)
      .post('/api/users')
      .send(user)
      .end((err, res) => {
        return resolve(res.body);
      });
  });
}

function createDummyUser() {
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

function loginCustomUser(user) {
  return new Promise((resolve, reject) => {
    chai.request(server)
      .post('/api/sessions')
      .send(user)
      .end((err, res) => {
        return resolve(res.body);
      });
  });
}

export default { getUserAndToken, createUserAndToken };