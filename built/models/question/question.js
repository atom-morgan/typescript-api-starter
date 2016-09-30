"use strict";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var QuestionSchema = new mongoose.Schema({
    content: { type: String, required: true },
    votes: { type: Number, default: 0, required: true },
    deletedByPostCreator: { type: Boolean, default: false, required: true },
    voters: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    _creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    _post: { type: Schema.Types.ObjectId, ref: 'Post', required: true }
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = mongoose.model('Question', QuestionSchema);
