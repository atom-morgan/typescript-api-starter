"use strict";
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Promise = require('bluebird');
var UserSchema = new mongoose.Schema({
    username: { type: String },
    password: { type: String }
});
UserSchema.pre('save', function (next) {
    var _this = this;
    if (!this.isModified('password')) {
        return next();
    }
    bcrypt.hash(this.password, 10, function (err, hash) {
        if (err) {
            return next(err);
        }
        _this.password = hash;
        next();
    });
});
UserSchema.methods.comparePassword = function (password) {
    var _this = this;
    return new Promise(function (resolve, reject) {
        bcrypt.compare(password, _this.password, function (err, res) {
            if (err) {
                return reject(err);
            }
            return resolve(res);
        });
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = mongoose.model('User', UserSchema);
