const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const Vente = require('./Vente');

const Paiement = sequelize.define('Paiement', {
  moyen: DataTypes.STRING,
  montant: DataTypes.FLOAT,
  date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  magasinId: { type: DataTypes.INTEGER, allowNull: false }
});

Paiement.belongsTo(Vente);
Vente.hasOne(Paiement);

module.exports = Paiement;