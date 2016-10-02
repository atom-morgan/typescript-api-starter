"use strict";
var auth_1 = require('../../middleware/auth');
var httpMocks = require('node-mocks-http');
describe('Auth middleware', function () {
    var req, res, next;
    beforeEach(function (done) {
        res = httpMocks.createResponse();
        next = chai.spy();
        done();
    });
    it('should call next() and set the decoded property on req with a valid token', function (done) {
        //TODO change this to user+session utility method
        req = httpMocks.createRequest({
            method: 'GET',
            url: '/api/users',
            headers: {
                'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkYW0xIiwiaWF0IjoxNDc1MzUwNTA4LCJleHAiOjE0NzU0MzY5MDh9.NcTlsiMVWaIqV4horsqVy6AdoH5rqqIydlaeAk_7mOw'
            }
        });
        auth_1.default.isAuthenticated(req, res, next)
            .then(function () {
            next.should.have.been.called();
            req.should.have.property('decoded');
            req.decoded.should.have.property('username');
            req.decoded.should.have.property('iat');
            req.decoded.should.have.property('exp');
            done();
        });
    });
    it('should return an error if no token is provided', function (done) {
        req = httpMocks.createRequest({
            method: 'GET',
            url: '/api/users'
        });
        auth_1.default.isAuthenticated(req, res, next)
            .catch(function () {
            next.should.not.have.been.called();
            res.statusCode.should.eql(403);
            done();
        });
    });
    it('should return an error if an invalid token is provided', function (done) {
        req = httpMocks.createRequest({
            method: 'GET',
            url: '/api/users',
            headers: {
                'Authorization': '123'
            }
        });
        auth_1.default.isAuthenticated(req, res, next)
            .catch(function () {
            next.should.not.have.been.called();
            res.statusCode.should.eql(403);
            done();
        });
    });
});
