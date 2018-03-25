const { createUser, login, newBlogPost } = require('../controllers');
const { authenticate } = require('../utils/Middleware');

module.exports = server => {
  server.route('/api/users').post(createUser);
  server.route('/api/login').post(login);
  server.route('/api/blog/new').post(authenticate, newBlogPost);
};