const Blog = require('../models/blog');

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
  },
];

const listWithOneBlog = [
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
];

const dummy = () => {
  return 1;
};

const totalLikes = (blogs) => {
  const sum = (acc, current) => {
    return acc + current.likes;
  };
  return blogs.reduce(sum, 0);
};

const favoriteBlog = (blogs) => {
  const mostedLiked = blogs.reduce((acc, current) => {
    return acc.likes > current.likes ? acc : current;
  }, blogs[0]);
  return mostedLiked;
};

const mostBlogs = (blogs) => {
  const authorsBlogsCounter = blogs.reduce((acc, blog) => {
    if (acc[blog.author]) {
      acc[blog.author]++;
    } else {
      acc[blog.author] = 1;
    }
    return acc;
  }, {});

  const authorWithTheMostBlogs = Object.entries(authorsBlogsCounter).reduce(
    (acc, author) => {
      if (acc.blogs < author[1]) {
        acc.author = author[0];
        acc.blogs = author[1];
      }
      return acc;
    },
    { author: '', blogs: 0 }
  );

  return authorWithTheMostBlogs;
};

const mostLikes = (blogs) => {
  const map = new Map();
  blogs.forEach((blog) => {
    if (map.has(blog.author)) {
      map.set(blog.author, map.get(blog.author) + blog.likes);
    } else {
      map.set(blog.author, blog.likes);
    }
  });

  const result = { author: '', likes: 0 };
  for (const [key, value] of map) {
    if (result.likes < value) {
      result.author = key;
      result.likes = value;
    }
  }
  return result;
};

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'willremovethissoon',
    author: 'Jhon Doe',
    url: 'https://fullstackopen.com/',
    likes: 4,
  });
  await blog.save();
  await blog.deleteOne();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  listWithOneBlog,
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  nonExistingId,
  blogsInDb,
};
