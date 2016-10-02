"use strict";
var jwt = require('jsonwebtoken');
var Promise = require('bluebird');
var config = require('../../config.json');
var isAuthenticated = function (req, res, next) {
    var token = req.get('Authorization');
    return new Promise(function (resolve, reject) {
        if (token) {
            jwt.verify(token, config.secret, function (err, decoded) {
                if (err) {
                    return reject(res.status(403).json({ message: err.message }));
                }
                if (decoded) {
                    req.decoded = decoded;
                    return resolve(next());
                }
            });
        }
        else {
            return reject(res.status(403).json({ message: 'No token provided!' }));
        }
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = { isAuthenticated: isAuthenticated };
