"use strict";
var express = require('express');
var users_1 = require('../../controllers/users');
var auth_1 = require('../../middleware/auth');
var router = express.Router();
router.route('/')
    .get(auth_1.default.isAuthenticated, users_1.default.get)
    .post(users_1.default.create);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;
