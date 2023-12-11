const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define('Users', {
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
    email: {
      type: DataTypes.STRING,
      isUnique: true,
      allowNull: false,
      validate: {
        isEmail: {
          msg: 'Must be a valid email address',
        },
      },
    },
    roleKey: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    address: {
      type: DataTypes.STRING,
    },
    accountId: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
  });

  return Users;
};
