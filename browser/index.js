const React = require('react');
const router = require('./router');

const container = document.getElementById('timeloop');
router.run((Root) => {
  React.render(<Root />, container);
});
