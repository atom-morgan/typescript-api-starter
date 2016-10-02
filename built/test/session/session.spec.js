"use strict";
var user_1 = require('../../models/user');
var index_1 = require('../../index');
describe('Session', function () {
    beforeEach(function (done) {
        user_1.default.remove({}, function (err) {
            done();
        });
    });
    beforeEach(function (done) {
        user_1.default.create({ username: 'adam', password: 'password' }, function (err, user) {
            done();
        });
    });
    describe('POST Session', function () {
        var validUser = { username: 'adam', password: 'password' };
        var invalidUser = { username: 'wrong', password: 'wrong' };
        var invalidPassword = { username: 'adam', password: 'wrong' };
        it('should return a token with a valid username and password', function (done) {
            chai.request(index_1.default)
                .post('/api/sessions')
                .send(validUser)
                .end(function (err, res) {
                res.should.have.status(200);
                res.body.should.have.property('token');
                done();
            });
        });
        it('should return an error with an invalid username', function (done) {
            chai.request(index_1.default)
                .post('/api/sessions')
                .send(invalidUser)
                .end(function (err, res) {
                res.should.have.status(500);
                res.body.should.have.property('error');
                res.body.error.should.eql('User could not be found');
                done();
            });
        });
        it('should return an error with an invalid password', function (done) {
            chai.request(index_1.default)
                .post('/api/sessions')
                .send(invalidPassword)
                .end(function (err, res) {
                res.should.have.status(500);
                res.body.should.have.property('error');
                res.body.error.should.eql('Incorrect password');
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
