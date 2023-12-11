const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  const Cart = sequelize.define('carts', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
    cartId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      autoIncrement: false,
    },
  });

  return Cart;
};
