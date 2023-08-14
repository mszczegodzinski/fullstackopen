const express = require('express');
const blogsRouter = express.Router();
const Blog = require('../models/blog');

blogsRouter.get('/', (req, res) => {
  Blog.find({}).then((blogs) => {
    res.json(blogs);
  });
});

blogsRouter.post('/', (req, res) => {
  const { title, author, url, likes } = req.body;
  const blog = new Blog({ title, author, url, likes });

  blog
    .save()
    .then((newBlog) => {
      res.status(201).json(newBlog);
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = blogsRouter;
