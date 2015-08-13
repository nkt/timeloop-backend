const util = require('util');
const Promise = require('bluebird');
const promptly = Promise.promisifyAll(require('promptly'));
const chalk = require('chalk');

const log = {
  info(...args) {
    const msg = util.format(...args);
    console.log(chalk.green(msg));
  },
  warn(...args) {
    const msg = util.format(...args);
    console.error(chalk.yellow(msg));
  },
  error(...args) {
    const msg = util.format(...args);
    console.error(chalk.red(msg));
  }
};

const prompt = {
  text(label, options = {}) {
    return promptly.promptAsync(`${label}: `, Object.assign({
      trim: true
    }, options));
  },
  number(label) {
    return this.text(label, {
      validator(value) {
        if (!/\d+/.test(value)) {
          throw new Error('Expected number');
        }

        return Number(value);
      }
    })
  },
  password() {
    return promptly.passwordAsync(`Password: `, {trim: true});
  }
};

module.exports = {
  log,
  prompt
};
