"use strict";
var user_1 = require('../../models/user');
var index_1 = require('../../index');
var utils_1 = require('../utils');
describe('User', function () {
    beforeEach(function (done) {
        user_1.default.remove({}, function (err) {
            done();
        });
    });
    describe('GET User', function () {
        var token;
        beforeEach(function (done) {
            utils_1.default.createUserAndGetToken()
                .then(function (res) {
                token = res.token;
                done();
            });
        });
        it('should get a response', function (done) {
            chai.request(index_1.default)
                .get('/api/users')
                .set('Authorization', token)
                .end(function (err, res) {
                res.should.have.status(200);
                res.body.message.should.eql('GET Users Controller!');
                done();
            });
        });
    });
    describe('POST User', function () {
        it('should return a user object with a valid username and password', function (done) {
            var user = { username: 'testuser', password: 'password' };
            chai.request(index_1.default)
                .post('/api/users')
                .send(user)
                .end(function (err, res) {
                res.should.have.status(200);
                res.body.should.have.property('_id');
                res.body.username.should.eql(user.username);
                done();
            });
        });
    });
    afterEach(function (done) {
        user_1.default.remove({}, function (err) {
            done();
        });
    });
});
