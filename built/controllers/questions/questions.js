"use strict";
var question_1 = require('../../models/question');
function get(req, res) {
    console.log('Question.get id: ', req.params.id);
    question_1.default.findOne({ _id: req.params.id })
        .populate('_creator')
        .populate('_post')
        .exec(function (err, question) {
        if (err) {
            res.status(500).send(err);
        }
        res.status(200).json(question);
    });
}
function create(req, res) {
    var question = new question_1.default({
        content: req.body.content,
        _creator: req.body._creator,
        _post: req.body._post
    });
    question.save()
        .then(function (question) {
        res.status(200).json(question);
    })
        .catch(function (err) {
        res.status(500).json({ error: 'Question could not be created.' });
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = { get: get, create: create };
