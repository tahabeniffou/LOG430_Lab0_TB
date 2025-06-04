const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Categorie = sequelize.define('Categorie', {
  nom: DataTypes.STRING,
  magasinId: { type: DataTypes.INTEGER, allowNull: false }
});

module.exports = Categorie;