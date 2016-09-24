"use strict";
var user_1 = require('../../models/user');
function get(req, res) {
    res.send('GET Users Controller!');
}
function create(req, res) {
    var user = new user_1.default({
        username: req.body.username,
        password: req.body.password
    });
    user.save()
        .then(function (user) {
        res.status(200).json(user);
    })
        .catch(function (err) {
        res.status(500).json({ error: 'User could not be created. ' });
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = { get: get, create: create };
