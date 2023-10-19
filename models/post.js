const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  id: {
    type: Number,  
  },
  title: {
    type: String, 
  },
  author: {
    type: String,
  },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
