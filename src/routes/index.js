/* eslint no-sync:0 */
const fs = require('fs');
const path = require('path');

function routes(app) {
  fs.readdirSync(__dirname)
    .map((name) => path.join(__dirname, name))
    .filter((filename) => filename !== __filename)
    .map(require)
    .forEach((router) => router(app));
}

module.exports = routes;
