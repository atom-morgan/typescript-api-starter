"use strict";
var user_1 = require('../../models/user');
var index_1 = require('../../index');
var utils_1 = require('../utils');
describe('User', function () {
    beforeEach(function () {
        return user_1.default.remove({});
    });
    describe('GET User', function () {
        var token;
        beforeEach(function () {
            return utils_1.default.createUserAndGetToken().then(function (res) {
                token = res.token;
            });
        });
        it('should get a response', function () {
            return chai.request(index_1.default)
                .get('/api/users')
                .set('Authorization', token)
                .then(function (res) {
                res.should.have.status(200);
                res.body.message.should.eql('GET Users Controller!');
            });
        });
    });
    describe('POST User', function () {
        it('should return a user object with a valid username and password', function () {
            var user = { username: 'testuser', password: 'password' };
            return chai.request(index_1.default)
                .post('/api/users')
                .send(user)
                .then(function (res) {
                res.should.have.status(200);
                res.body.should.have.property('_id');
                res.body.username.should.eql(user.username);
            });
        });
    });
    afterEach(function () {
        return user_1.default.remove({});
    });
});
