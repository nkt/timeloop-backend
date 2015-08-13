const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const {database, username, password, host} = require('../config').database;

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect: 'postgres',
  define: {
    underscored: true,
    underscoredAll: true
  }
});

fs.readdirSync(__dirname)
  .map((name) => path.join(__dirname, name))
  .filter((filename) => filename !== __filename)
  .forEach((filename) => sequelize.import(filename));

Object.keys(sequelize.models).forEach((name) => {
  const Model = sequelize.models[name];
  if (Model.associate) {
    Model.associate(sequelize.models);
  }
});

sequelize.sync();

module.exports = sequelize;
