'use strict';

const request = require('request');
const winston = require('winston');

/**
 * The User class
 */
function User() {
  // internal data store
  this._data = {};

  this._post_url = 'https://www.askinow.com/json/data_transfer/users';
}

User.prototype.set = function (key, value) {
  if (typeof key !== 'string')
    throw new Error('key should be string');

  this._data[key] = value;
};

User.prototype.save = function () {
  let options = {
    rejectUnauthorized: false,
    url: this._post_url,
    form: this._data,
  };

  winston.info(options.form);

  return new Promise((resolve, reject) => {
    request.post(options, (err, res, body) => {
      if (err)
        return reject(err);
      
      return resolve(body);
    });
  });
};

User.createWithLegacyUser = function (legacyUser) {
  let user = new User();

  user.set('id', legacyUser.userId);
  user.set('email', legacyUser.email);
  user.set('nickName', legacyUser.userName);
  user.set('trueName', legacyUser.userName);
  user.set('portrait', legacyUser.avatar);
  user.set('isTutor', legacyUser.isTutor);
  user.set('intro', legacyUser.intro);

  return user;
}

module.exports = User;