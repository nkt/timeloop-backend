module.exports = (app) => {
  const {User, Event, Project} = app.db.models;

  app.get('/users/me', (req, res) => {
    res.json(req.user);
  });

  app.get('/users', (req, res, next) => {
    User.findAll({
      order: ['rate']
    }).then((users) => {
      res.json(users);
    }).catch(next);
  });

  app.param('user_id', (req, res, next, id) => {
    const where = {};
    if (/^\d+$/.test(id)) {
      where.id = Number(id);
    } else {
      where.username = id;
    }

    User.findOne({where}).then((user) => {
      if (!user) {
        next({
          status: 404,
          code: 'not_found',
          message: 'User not found',
          params: where
        });
      } else {
        Object.assign(req.params, {user});
        next();
      }
    }).catch(next);
  });

  app.get('/users/:user_id', (req, res, next) => {
    res.json(req.params.user);
  });

  app.get('/users/:user_id/events', (req, res, next) => {
    req.params.user.getEvents({
      attributes: ['id', 'title', 'description', 'date', 'time'],
      include: [
        {
          model: Project,
          as: 'project',
          attributes: ['id', 'name', 'color']
        }
      ]
    }).then((events) => {
      res.json(events);
    }).catch(next);
  });
};
