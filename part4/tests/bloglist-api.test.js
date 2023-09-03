const { expect } = require('@jest/globals');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

const Blog = require('../models/blog');
const helper = require('../utils/list-helper');

describe('BlogList API', () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);
  });

  test('blogs are return as JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all Blogs are returned', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test('unique identifier is named "id" insted of "_id', async () => {
    const response = await api.get('/api/blogs');
    const blog = response.body[0];

    expect(blog.id).toBeDefined();
    expect(blog._id).toBeUndefined();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
