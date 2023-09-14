const express = require('express');
const blogsRouter = express.Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

blogsRouter.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await Blog.findById(id);

    if (!blog) {
      res.status(404).json({ message: 'Blog not found' }).end();
    } else {
      res.json(blog);
    }
  } catch (error) {
    res.status(400).end();
  }
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

blogsRouter.delete('/:id', async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

module.exports = blogsRouter;
