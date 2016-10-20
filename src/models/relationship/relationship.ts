import mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RelationshipSchema = new mongoose.Schema({
  followerId: { type: Schema.Types.ObjectId, required: true, index: true },
  followedId: { type: Schema.Types.ObjectId, required: true, index: true }
});

export default mongoose.model('Relationship', RelationshipSchema);