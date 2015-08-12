const passport = require('passport');
const LocalStrategy = require('passport-local');

module.exports = (app) => {
  const {User} = app.db.models;

  passport.serializeUser(function serializeUser(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function deserializeUser(id, done) {
    User.findOne({
      where: {id}
    }).then((user) => {
      done(null, user);
    }).catch(done);
  });

  passport.use(new LocalStrategy((username, password, done) => {
    User.authorize(username, password).then((user) => {
      done(null, user);
    }).catch(done);
  }));

  app.post('/sessions', (req, res, next) => {
    console.log(req.body);
    next();
  },passport.authenticate('local'), (req, res) => {
    res.json(req.user);
    res.status(201);
  });
};
