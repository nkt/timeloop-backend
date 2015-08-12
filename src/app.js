const express = require('express');
const config = require('./config');
const models = require('./models');
const middlewares = require('./middlewares');
const auth = require('./auth');
const routes = require('./routes');

const app = express();
app.set('trust proxy', true);
app.set('x-powered-by', false);

Object.assign(app, {
  db: models
});

auth(app, config);
middlewares(app, config);
routes(app);

app.use((req, res, next) => {
  next({
    status: 404,
    code: 'not_found',
    message: 'Not Found'
  });
});

app.use((err, req, res, next) => {
  if (err.name === 'SequelizeValidationError') {
    res.status(400);
    res.json({
      code: 'not_valid',
      message: err.message,
      params: err.errors.reduce((params, {path, message, type}) => {
        params[path] = {type, message};
        return params;
      }, {})
    });
  } else {
    res.status(err.status || 500);
    res.json({
      code: err.code,
      message: err.message,
      params: err.params || {}
    });
  }
});

const server = app.listen(config.listen, () => {
  console.log('server started', server.address());
});
