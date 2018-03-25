const BlogPost = require('../models/BlogPostModel');

const newBlogPost = (req, res) => {
  const { title, content } = req.body;
  const newPost = new BlogPost({ title, content });
  newPost
    .save()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(422).json({ message: 'Error saving post!' });
    });
};

module.exports = {
  newBlogPost
};