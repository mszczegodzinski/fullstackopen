const config = require('./utils/config');
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const blogsRouter = require('./controllers/blogs');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const mongoUrl = config.MONGODB_URI;

mongoose.set('strictQuery', false);
mongoose
  .connect(mongoUrl)
  .then(() => {
    logger.info('Connected to MongoDB');
  })
  .catch((err) => {
    logger.info('error connecting to MongoDB: ', err);
  });

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/blogs', blogsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
