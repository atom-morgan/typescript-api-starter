"use strict";
var express = require('express');
var users_1 = require('./users');
var sessions_1 = require('./sessions');
var router = express.Router();
router.route('/')
    .get(function (req, res) {
    res.send('Welcome to the TypeScript API!');
});
router.use('/users', users_1.default);
router.use('/sessions', sessions_1.default);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;
