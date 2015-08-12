const helpers = require('./helpers');
const commands = [
  require('./user-create')
];

module.exports = (program) => {
  commands.forEach((command) => {
    program
      .command(command.name)
      .description(command.description)
      .action((...args) => {
        const result = command.action(...args);
        if (!result.then) {
          return;
        }

        result.then(() => {
          process.exit(0);
        }).catch((e) => {
          helpers.log.error(e.message);
          process.exit(1);
        });
      });
  });
};
