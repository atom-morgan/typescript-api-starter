"use strict";
var user_1 = require('../../models/user');
var index_1 = require('../../index');
describe('Session', function () {
    beforeEach(function () {
        return user_1.default.remove({});
    });
    beforeEach(function () {
        return user_1.default.create({ username: 'adam', password: 'password' });
    });
    describe('POST Session', function () {
        var validUser = { username: 'adam', password: 'password' };
        var invalidUser = { username: 'wrong', password: 'wrong' };
        var invalidPassword = { username: 'adam', password: 'wrong' };
        it('should return a token with a valid username and password', function () {
            return chai.request(index_1.default)
                .post('/api/sessions')
                .send(validUser)
                .then(function (res) {
                res.should.have.status(200);
                res.body.should.have.property('token');
            });
        });
        it('should return an error with an invalid username', function () {
            return chai.request(index_1.default)
                .post('/api/sessions')
                .send(invalidUser)
                .catch(function (err) {
                err.response.should.have.status(404);
                err.response.body.should.have.property('error');
                err.response.body.error.should.eql('User could not be found');
            });
        });
        it('should return an error with an invalid password', function () {
            return chai.request(index_1.default)
                .post('/api/sessions')
                .send(invalidPassword)
                .catch(function (err) {
                err.response.should.have.status(500);
                err.response.body.should.have.property('error');
                err.response.body.error.should.eql('Incorrect password');
            });
        });
    });
    afterEach(function () {
        return user_1.default.remove({});
    });
});
