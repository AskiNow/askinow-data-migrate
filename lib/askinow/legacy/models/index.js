'use strict';

const fs        = require('fs');
const path      = require('path');
const Sequelize = require('sequelize');
const sequelize = require(path.join(__dirname, '..', 'config', 'sequelize.config.js'));
const winston   = require('winston');

// to be exported
var db = {};

fs
  .readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== 'index.js');
  })
  .forEach((file) => {
    winston.info(`[Sequelize] importing file ${file} ...`);
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

// let db name be a key
Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName])
    db[modelName].associate(db);
});

module.exports = db;