const { createUser } = require('./User');
const { login } = require('./Login');
const { newBlogPost } = require('./BlogPost');

module.exports = {
  createUser,
  login,
  newBlogPost,
};