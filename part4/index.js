require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const Blog = require('./models/blog');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/blogs', (req, res) => {
  Blog.find({}).then((blogs) => {
    res.json(blogs);
  });
});

app.post('/api/blogs', (req, res) => {
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

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
