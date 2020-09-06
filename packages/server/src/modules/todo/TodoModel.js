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
});

const TodoModel = mongoose.model('Todo', TodoSchema);

export default TodoModel;
