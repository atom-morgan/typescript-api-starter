"use strict";
var express = require('express');
var users_1 = require('./users');
var sessions_1 = require('./sessions');
var posts_1 = require('./posts');
var questions_1 = require('./questions');
var router = express.Router();
router.route('/')
    .get(function (req, res) {
    res.send('Welcome to the TypeScript API!');
});
router.use('/users', users_1.default);
router.use('/sessions', sessions_1.default);
router.use('/posts', posts_1.default);
router.use('/questions', questions_1.default);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;
