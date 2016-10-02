"use strict";
var express = require('express');
var questions_1 = require('../../controllers/questions');
var auth_1 = require('../../middleware/auth');
var router = express.Router();
router.route('/')
    .post(auth_1.default.isAuthenticated, questions_1.default.create);
router.route('/:id')
    .get(questions_1.default.get);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;
