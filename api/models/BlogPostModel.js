const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogPostSchema = Schema({
  title: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: titleLengthValidator,
      message: 'Titles must be at least 5 characters long.',
    },
  },
  content: {
    type: String,
    required: true
  },
  createdOn: {
    type: Date,
    default: new Date(),
    required: true,
  },
});

function titleLengthValidator(title) {
  return title.length > 4;
}

module.exports = mongoose.model('BlogPost', BlogPostSchema);