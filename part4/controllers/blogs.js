const express = require('express');
const blogsRouter = express.Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

blogsRouter.post('/', async (req, res) => {
  const { author, title, url, likes } = req.body;
  if (!title || !url) {
    return res.status(400).json({ message: 'Please provide title and url' });
  }

  const blog = new Blog({ title, author, url, likes });
  const newBlog = await blog.save();

  res.status(201).json(newBlog);
});

module.exports = blogsRouter;
