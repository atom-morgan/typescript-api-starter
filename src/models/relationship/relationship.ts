import mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RelationshipSchema = new mongoose.Schema({
  followerId: { type: Schema.Types.ObjectId, required: true, unique: true },
  followedId: { type: Schema.Types.ObjectId, required: true, unique: true }
});

RelationshipSchema.index({ followerId: 1, followedId: 1}, { unique: true });

RelationshipSchema.post('save', (err, doc, next) => {
  if (err.name === 'MongoError' && err.code === 11000) {
    next(new Error('This relationship already exists!'));
  } else {
    next(err);
  }
});

export default mongoose.model('Relationship', RelationshipSchema);
