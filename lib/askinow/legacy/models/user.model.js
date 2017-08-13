'use strict';

module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define(
    'user',
    {
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'userid',
      },
      userName: {
        type: DataTypes.STRING,
        field: 'uname'
      },
      redundantUserName: {
        type: DataTypes.STRING,
        field: 'uname1'
      },
      password: {
        type: DataTypes.STRING(50),
        field: 'upass',
      },
      avatar: {
        type: DataTypes.STRING(350),
        field: 'upic',
      },
      email: {
        type: DataTypes.STRING(50),
        field: 'email',
      },
      indbdate: {
        type: DataTypes.DATE,
        field: 'indbdate',
      },
      birthday: {
        type: DataTypes.STRING(100),
        field: 'DateOfBirth',
      },
      isTutor: {
        type: DataTypes.INTEGER,
        field: 'utype',
      },
      intro: {
        type: DataTypes.STRING,
        field: 'descr',
      }
    },
    {
      tableName: 'userinfo',
      timestamps: false,
    });

  return User;
};