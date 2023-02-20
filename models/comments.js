import mongoose from 'mongoose';

const schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog',
  },
});

export { schema as commentSchema };
