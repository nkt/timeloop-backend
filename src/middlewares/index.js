const bodyParser = require('body-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const passport = require('passport');
const checkAuth = require('./check-auth');

function middlewares(app, config) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(session({
    name: 'sid',
    secret: config.session.secret,
    resave: true,
    proxy: true,
    cookie: {
      httpOnly: true
    },
    store: new RedisStore(config.redis),
    saveUninitialized: true
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(checkAuth());
}

module.exports = middlewares;
