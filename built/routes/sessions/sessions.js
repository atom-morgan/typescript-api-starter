"use strict";
var express = require('express');
var sessions_1 = require('../../controllers/sessions');
var router = express.Router();
router.route('/')
    .post(sessions_1.default.create);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;
