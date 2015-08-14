const React = require('react');
const {Navbar, Nav, Glyphicon} = require('react-bootstrap');
const {NavItemLink} = require('react-router-bootstrap');

const Header = React.createClass({
  getBrand() {
    return <a href="/">Timeloop</a>;
  },
  render() {
    return (
      <Navbar brand={this.getBrand()}>
        <Nav>
          <NavItemLink to="calendar">
            <Glyphicon glyph="calendar" />
            Calendar
          </NavItemLink>
          <NavItemLink to="projects">
            <Glyphicon glyph="briefcase" />
            Projects
          </NavItemLink>
          <NavItemLink to="reports">
            <Glyphicon glyph="stats" />
            Reports
          </NavItemLink>
        </Nav>
      </Navbar>
    );
  }
});

module.exports = Header;
