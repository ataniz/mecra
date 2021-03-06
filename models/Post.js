const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  title: {
    type: String,
  },
  state: '',
  name: {
    type: String,
  },
  avatar: {
    type: String,
  },
  votes: {
    upvotes: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: 'users',
        },
      },
    ],
    downvotes: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: 'users',
        },
      },
    ],
  },
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
      text: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('post', PostSchema);
