"use strict";
var index_1 = require('../index');
var Promise = require('bluebird');
var userCredentials = { username: 'johndoe', password: 'password' };
var createUserAndGetToken = function () {
    return createUser().then(loginUser);
};
function createUser() {
    return new Promise(function (resolve, reject) {
        chai.request(index_1.default)
            .post('/api/users')
            .send(userCredentials)
            .end(function (err, res) {
            return resolve(res.body);
        });
    });
}
function loginUser() {
    return new Promise(function (resolve, reject) {
        chai.request(index_1.default)
            .post('/api/sessions')
            .send(userCredentials)
            .end(function (err, res) {
            return resolve(res.body);
        });
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = { createUserAndGetToken: createUserAndGetToken };
