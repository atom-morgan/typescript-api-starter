"use strict";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PostSchema = new mongoose.Schema({
    _creator: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    title: { type: String, required: true },
    description: { type: String },
    endTime: { type: Date },
    questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }]
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = mongoose.model('Post', PostSchema);
