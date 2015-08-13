module.exports = (app) => {
  const {Project, Event, User} = app.db.models;

  app.get('/api/projects', (req, res, next) => {
    Project.findAll().then((projects) => {
      res.json(projects);
    }).catch(next);
  });

  app.post('/api/projects', (req, res, next) => {
    Project.create(req.body).then((project) => {
      res.json(project).status(201);
    }).catch(next);
  });

  app.param('project_id', (req, res, next, id) => {
    const where = {};
    if (/^\d+$/.test(id)) {
      where.id = Number(id);
    } else {
      where.name = id;
    }

    Project.findOne({where}).then((project) => {
      if (!project) {
        next({
          status: 404,
          code: 'not_found',
          message: 'Project not found',
          params: where
        });
      } else {
        Object.assign(req.params, {project});
        next();
      }
    }).catch(next);
  });

  app.get('/api/projects/:project_id', (req, res, next) => {
    res.json(req.params.project);
  });

  app.get('/api/projects/:project_id/events', (req, res, next) => {
    req.params.project.getEvents({
      attributes: ['id', 'title', 'description', 'date', 'time'],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username', 'rate']
        }
      ]
    }).then((events) => {
      res.json(events);
    }).catch(next);
  });

  app.post('/api/projects/:project_id/events', (req, res, next) => {
    Event.create(Object.assign(req.body, {
      user_id: req.user.id,
      project_id: req.params.project.id
    })).then((event) => {
      res.json(event).status(201);
    }).catch(next);
  });
};
