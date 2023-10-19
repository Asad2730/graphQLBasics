const mongoose = require('mongoose');

const postSchemaWithAuthor = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const PostWithAuthor = mongoose.model('Author', postSchemaWithAuthor);

module.exports = PostWithAuthor;
