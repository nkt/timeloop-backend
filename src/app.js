const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const passport = require('passport');
const models = require('./models');
const config = require('./config');

const app = express();

app.set('trust proxy', true);
app.set('x-powered-by', false);

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

models.sequelize.sync();

const server = app.listen(config.listen, () => {
  console.log('server started', server.address());
});
