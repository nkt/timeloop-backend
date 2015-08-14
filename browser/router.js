const React = require('react');
const Router = require('react-router');
const {Route} = Router;
const App = require('./components/App');
const Calendar = require('./components/Calendar');
const Projects = require('./components/Projects');
const Reports = require('./components/Reports');

const router = Router.create({
  routes: (
    <Route handler={App}>
      <Route name="calendar" path="calendar" handler={Calendar} />
      <Route name="projects" path="projects" handler={Projects} />
      <Route name="reports" path="reports" handler={Reports} />
    </Route>
  )
});

module.exports = router;
