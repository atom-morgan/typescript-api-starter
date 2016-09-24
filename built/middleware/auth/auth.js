"use strict";
var jwt = require('jsonwebtoken');
var config = require('../../config.json');
var isAuthenticated = function (req, res, next) {
    var token = req.get('Authorization');
    if (token) {
        jwt.verify(token, config.secret, function (err, decoded) {
            if (err) {
                return res.status(403).json({ message: err.message });
            }
            if (decoded) {
                // TODO - is this needed?
                req.decoded = decoded;
                next();
            }
        });
    }
    else {
        return res.status(403).json({ message: 'No token provided!' });
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = { isAuthenticated: isAuthenticated };
