// src/models/index.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.POSTGRES_DB   || 'posdb',
  process.env.POSTGRES_USER || 'posuser',
  process.env.POSTGRES_PASSWORD || 'pospass',
  {
    host: process.env.POSTGRES_HOST || 'db',
    dialect: 'postgres',
    logging: false
  }
);

module.exports = sequelize;
