const { expect } = require('@jest/globals');
const listHelper = require('../utils/list-helper');

test('dummy returns one', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe('total likes', () => {
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listHelper.listWithOneBlog);
    expect(result).toBe(5);
  });

  test('when list has 6 blogs ', () => {
    const result = listHelper.totalLikes(listHelper.initialBlogs);
    expect(result).toBe(36);
  });
});

describe('The most liked blog', () => {
  test('find the blog with the most likes', () => {
    const result = listHelper.favoriteBlog(listHelper.initialBlogs);
    expect(result).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
    });
  });
});

describe('The most blogs', () => {
  test('finds the author with the most blogs', () => {
    const result = listHelper.mostBlogs(listHelper.initialBlogs);
    expect(result).toEqual({
      author: 'Robert C. Martin',
      blogs: 3,
    });
  });
});

describe('the most total likes', () => {
  test('finds the author with the most total likes', () => {
    const result = listHelper.mostLikes(listHelper.initialBlogs);
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17,
    });
  });
});
