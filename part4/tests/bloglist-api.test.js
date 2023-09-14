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

  describe('initial blogs were saved', () => {
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

    test('unique identifier is named "id" insted of "_id"', async () => {
      const response = await api.get('/api/blogs');
      const blog = response.body[0];

      expect(blog.id).toBeDefined();
      expect(blog._id).toBeUndefined();
    });
  });

  describe('view a specific blog', () => {
    test('successful with a valid id', async () => {
      const initialBlogs = await helper.blogsInDb();
      const blog = initialBlogs[0];
      console.log(blog);

      const resultBlog = await api
        .get(`/api/blogs/${blog.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      expect(resultBlog.body).toEqual(blog);
    });

    test('fails with status code 404 if Blog does not exist', async () => {
      const validNonExistingId = await helper.nonExistingId();

      await api.get(`/api/blogs/${validNonExistingId}`).expect(404);
    });

    test('fails with status code 400 if Blog has invalid id', async () => {
      const invalidId = '1234567890';

      await api.get(`/api/blogs/${invalidId}`).expect(400);
    });
  });

  describe('add new Blog', () => {
    test('valid Blog can be added to DB', async () => {
      const validBlog = {
        title: 'A new valid blog',
        author: 'Test Author',
        url: 'https://somevalidblog.com/',
        likes: 7,
      };

      await api
        .post('/api/blogs')
        .send(validBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const updatedBlogList = await helper.blogsInDb();
      expect(updatedBlogList).toHaveLength(helper.initialBlogs.length + 1);

      const blogsContents = updatedBlogList.map((blog) => blog.title);
      expect(blogsContents).toContain(validBlog.title);
    });
    test('default likes value can be added', async () => {
      const blogWithoutLikes = {
        title: 'A new blog with no likes',
        author: 'Test Author',
        url: 'https://somevalidblog.com/',
      };

      const res = await api
        .post('/api/blogs')
        .send(blogWithoutLikes)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      expect(res.body.likes).toBe(0);
    });

    test('try add Blog with missing title', async () => {
      const invalidBlog = {
        author: 'Test Author',
        url: 'https://somevalidblog.com/',
      };

      await api
        .post('/api/blogs')
        .send(invalidBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/);

      const blogList = await helper.blogsInDb();
      expect(blogList).toHaveLength(helper.initialBlogs.length);
    });

    test('try add Blog with missing url', async () => {
      const invalidBlog = {
        title: 'A new blog with no likes',
        author: 'Test Author',
      };

      await api
        .post('/api/blogs')
        .send(invalidBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/);

      const blogList = await helper.blogsInDb();
      expect(blogList).toHaveLength(helper.initialBlogs.length);
    });
  });

  describe('delete a specific blog', () => {
    test('successful with a valid id', async () => {
      const initialBlogs = await helper.blogsInDb();
      const blog = initialBlogs[0];

      await api.delete(`/api/blogs/${blog.id}`).expect(204);

      const updatedBlogList = await helper.blogsInDb();
      expect(updatedBlogList).toHaveLength(helper.initialBlogs.length - 1);

      const blogsContents = updatedBlogList.map((blog) => blog.title);
      expect(blogsContents).not.toContain(blog.title);
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
