"use strict";
var post_1 = require('../../models/post');
function get(req, res) {
    post_1.default.findById({ _id: req.params.id })
        .populate('_creator')
        .exec(function (err, post) {
        if (err) {
            res.status(500).send(err);
        }
        res.status(200).json(post);
    });
}
function create(req, res) {
    var post = new post_1.default({
        _creator: req.body._creator,
        title: req.body.title,
        description: req.body.description,
        endTime: req.body.endTime
    });
    post.save()
        .then(function (post) {
        res.status(200).json(post);
    })
        .catch(function (err) {
        res.status(500).json({ error: 'Post could not be created.' });
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = { get: get, create: create };
