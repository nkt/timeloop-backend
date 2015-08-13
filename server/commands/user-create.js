const helpers = require('./helpers');
const {User} = require('../models').models;

module.exports = {
  name: 'user:create',
  description: 'Creates new user',
  async action() {
    const user = await User.create({
      username: await helpers.prompt.text('Username'),
      password: await helpers.prompt.password(),
      rate: await helpers.prompt.number('Rate')
    });
    helpers.log.info('User created!');
  }
};
