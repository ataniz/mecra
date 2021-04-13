const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  website: {
    type: String,
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
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
