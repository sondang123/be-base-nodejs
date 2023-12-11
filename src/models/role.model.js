const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  const Roles = sequelize.define('roles', {
    roleValue: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roleKey: {
      type: DataTypes.INTEGER,
    },
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
  });

  return Roles;
};
