const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const Vente = require('./Vente');
const Produit = require('./Produit');

const LigneVente = sequelize.define('LigneVente', {
  quantite: DataTypes.INTEGER,
  sousTotal: DataTypes.FLOAT
});

LigneVente.belongsTo(Vente);
LigneVente.belongsTo(Produit);
Vente.hasMany(LigneVente);

module.exports = LigneVente;