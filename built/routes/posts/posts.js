"use strict";
var express = require('express');
var posts_1 = require('../../controllers/posts');
var auth_1 = require('../../middleware/auth');
var router = express.Router();
router.route('/')
    .post(auth_1.default.isAuthenticated, posts_1.default.create);
router.route('/:id')
    .get(posts_1.default.get);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;
