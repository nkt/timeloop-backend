const program = require('commander');
const pkg = require('../package.json');
const commands = require('./commands');

commands(program);

program
  .version(pkg.version)
  .parse(process.argv);

if (!program.args.length) {
  program.help();
}
