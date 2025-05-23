const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Categorie = sequelize.define('Categorie', {
  nom: DataTypes.STRING
});

module.exports = Categorie;