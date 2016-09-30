import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const QuestionSchema = new mongoose.Schema({
  content: { type: String, required: true },
  votes: { type: Number, default: 0, required: true },
  deletedByPostCreator: { type: Boolean, default: false, required: true },
  voters: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  _creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  _post: { type: Schema.Types.ObjectId, ref: 'Post', required: true }
});

export default mongoose.model('Question', QuestionSchema);