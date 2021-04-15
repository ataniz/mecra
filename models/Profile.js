const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
  },
  location: {
    type: String,
  },
  education: {
    type: String,
  },
  bio: {
    type: String,
  },
  interests: {
    type: [String],
  },
  social: {
    youtube: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    github: {
      type: String,
    },
    twitter: {
      type: String,
    },
    facebook: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
  following: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
    },
  ],
  followers: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
    },
  ],
  forums: [
    {
      forum: {
        type: Schema.Types.ObjectId,
        ref: 'forums',
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

module.exports = Profile = mongoose.model('profile', ProfileSchema);
