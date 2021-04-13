const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ForumSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  admins: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
    },
  ],
  name: {
    type: String,
    required: true,
  },
  info: {
    type: String,
    required: true,
  },
  rules: {
    type: String,
  },
  members: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
    },
  ],
  posts: [
    {
      post: {
        type: Schema.Types.ObjectId,
        ref: 'posts',
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('forum', ForumSchema);
