const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const sum = (acc, current) => {
    return acc + current.likes;
  };
  return blogs.reduce(sum, 0);
};

module.exports = {
  dummy,
  totalLikes,
};
