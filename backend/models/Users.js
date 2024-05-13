const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
    unique: false
  },
  images: {
    type: String,
    required: false,
    unique: false
  },
  num_comments: {
    type: Number,
    required: false,
    default: 0
  },
  tags: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  group:{
    type: String,
    required: true
  }
}, { collection: 'post' });

const User = mongoose.model('User', postSchema);

module.exports = User;
