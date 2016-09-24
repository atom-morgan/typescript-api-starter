"use strict";
var user_1 = require('../../models/user');
var jwt = require('jsonwebtoken');
var config = require('../../config.json');
function create(req, res) {
    user_1.default.findOne({ username: req.body.username }).select('username password')
        .then(function (user) {
        if (!user) {
            return res.status(500).json({ error: 'User could not be found ' });
        }
        user.comparePassword(req.body.password)
            .then(function (result) {
            var isValidPassword = result;
            if (!isValidPassword) {
                return res.status(500).json({ error: 'Incorrect password' });
            }
            jwt.sign({ username: req.body.username }, config.secret, { expiresIn: "24h" }, function (err, token) {
                if (err) {
                    return res.status(500).json({ error: 'Could not create token' });
                }
                return res.status(200).json({ token: token });
            });
        })
            .catch(function (result) {
            // TODO handle rejected result
        });
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = { create: create };
