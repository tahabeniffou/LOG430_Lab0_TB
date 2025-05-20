const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Sale = sequelize.define('Sale', {
  total: { type: DataTypes.FLOAT, allowNull: false }
});

module.exports = Sale;
