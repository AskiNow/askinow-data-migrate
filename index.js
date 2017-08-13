'use strict';

require('dotenv').config();
const winston = require('winston');

const AskiNow = require('./lib/askinow');

const User = AskiNow.Legacy.User;
User.findAll({
  // attributes: [
  //   'userId',
  //   'userName',
  //   'email',
  //   'avatar',
  //   'fake'
  // ],
  order: [
    ['userId']
  ],
  limit: 100,
}).then((users) => {
  winston.info('Number of total users:', users.length);

  AskiNow.init();

  return Promise.all(
    users.map(
      (user) => AskiNow.User.createWithLegacyUser(user).save()));
}).then((res) => {
  res.forEach((result) => {
    winston.info(result);
  })

  process.exit(0);
}).catch((err) => {
  winston.error(err);

  process.exit(1);
});
