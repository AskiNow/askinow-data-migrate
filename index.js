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
  ]
}).then((users) => {
  winston.info('Number of total users:', users.length);

  AskiNow.init();

  let user = AskiNow.User.createWithLegacyUser(users[0]);
  return user.save();
}).then((res) => {
  winston.info(res);

  process.exit(0);
}).catch((err) => {
  winston.error(err);

  process.exit(1);
});
