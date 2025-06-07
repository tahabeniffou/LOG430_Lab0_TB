const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const Vente = require('./Vente');
const Produit = require('./Produit');

const LigneVente = sequelize.define('LigneVente', {
  quantite: DataTypes.INTEGER,
  sousTotal: DataTypes.FLOAT,
  magasinId: { type: DataTypes.INTEGER, allowNull: false }
});

LigneVente.belongsTo(Vente);
LigneVente.belongsTo(Produit);
Vente.hasMany(LigneVente);

module.exports = LigneVente;