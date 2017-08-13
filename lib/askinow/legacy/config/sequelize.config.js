const assert = require('assert');

const winston = require('winston');
const Sequelize = require('sequelize');

if (!global.sequelize) {
  assert(process.env.MSSQL_DATABASE,
    'The MSSQL_DATABASE is not in the environment');

  global.sequelize = new Sequelize(
    process.env.MSSQL_DATABASE,
    process.env.MSSQL_UID,
    process.env.MSSQL_PWD,
    {
      host: process.env.MSSQL_SERVER,
      dialect: 'mssql',
      dialectOptions: {
        encrypt: true,
      },
      pool: {
        max: 10,
        min: 0,
        idle: 30000,
      },
    }
  );

  sequelize
    .authenticate()
    .then(() => {
      winston.info('Connection to mssql established');
      winston.info(`DATABASE: ${process.env.MSSQL_DATABASE}`);
      winston.info(`USER:     ${process.env.MSSQL_UID}`);
      winston.info(`SERVER:   ${process.env.MSSQL_SERVER}`);
    })
    .catch((err) => {
      winston.error(`connection to mssql failed: ${err.message}`);
    });
}

module.exports = sequelize;