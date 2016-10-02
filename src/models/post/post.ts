import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const PostSchema = new mongoose.Schema({
  _creator: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  title: { type: String, required: true },
  description: { type: String },
  endTime: { type: Date },
  questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }]
});

export default mongoose.model('Post', PostSchema);