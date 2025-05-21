const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const Categorie = require('./Categorie');

const Produit = sequelize.define('Produit', {
  nom: DataTypes.STRING,
  prix: DataTypes.FLOAT,
  stock: DataTypes.INTEGER
});

Produit.belongsTo(Categorie);
Categorie.hasMany(Produit);

module.exports = Produit;