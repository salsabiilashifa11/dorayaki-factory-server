/* eslint-disable no-unused-expressions */
const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const process = require('process');
const passport = require('./api/utils/Passport');

const app = express();

const admin = require('./api/routes/AdminRoutes');
const recipe = require('./api/routes/RecipeRoutes');
const ingredient = require('./api/routes/IngredientRoutes');
const request = require('./api/routes/RequestRoutes');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ limit: '10mb', extended: false }));
app.use(passport.initialize());
app.use((req, res, next) => {
  const origin = req.get('origin');

  res.setHeader('Access-Control-Allow-Origin', origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
  res.setHeader('Access-Control-Expose-Headers', 'Access-Token, Uid');
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});

app.get('/', (_, res) => {
  res.send('<h1>Welcome to Dorayaki Factory API!</h1>');
});
app.get('/favicon.ico', (req, res) => res.status(204));

// routes
app.use('/admin', admin);
app.use('/recipes', recipe);
app.use('/ingredients', ingredient);
app.use('/requests', request);

// Catch error 404
app.use((_, res, next) => {
  next(createError.NotFound());
});

// React on SIGINT and SIGTERM to gracefully shutdown
app.shutdown = () => process.exit;

process.on('SIGINT', () => {
  app.shutdown();
});

process.on('SIGTERM', () => {
  app.shutdown();
});

module.exports = app;
