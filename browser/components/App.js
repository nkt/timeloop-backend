const React = require('react');
const {RouteHandler} = require('react-router');
const {Grid} = require('react-bootstrap');
const Header = require('./Header');

const App = React.createClass({
  render() {
    return (
      <div>
        <Header />
        <Grid>
          <RouteHandler />
        </Grid>
      </div>
    );
  }
});

module.exports = App;
