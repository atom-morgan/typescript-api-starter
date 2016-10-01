"use strict";
var user_1 = require('../../models/user');
var index_1 = require('../../index');
describe('User', function () {
    beforeEach(function (done) {
        user_1.default.remove({}, function (err) {
            done();
        });
    });
    describe('GET User', function () {
        it('should get a response', function (done) {
            chai.request(index_1.default)
                .get('/api/users')
                .end(function (err, res) {
                res.should.have.status(200);
                res.body.message.should.eql('GET Users Controller!');
                done();
            });
        });
    });
});
