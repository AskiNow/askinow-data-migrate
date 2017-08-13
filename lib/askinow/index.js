'use strict';

const User = require('./user');
const Legacy = require('./legacy');

module.exports = {
  /* initialise */  
  init: () => { },

  /* user module */
  User: User,

  Legacy: Legacy,
};