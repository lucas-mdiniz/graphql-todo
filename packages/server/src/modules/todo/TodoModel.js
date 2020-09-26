import mongoose from 'mongoose';

const { Schema } = mongoose;

const TodoSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  done: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const TodoModel = mongoose.model('Todo', TodoSchema);

export default TodoModel;
