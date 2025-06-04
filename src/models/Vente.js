const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const Utilisateur = require('./Utilisateur');

const Vente = sequelize.define('Vente', {
  total: DataTypes.FLOAT,
  date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  magasinId: { type: DataTypes.INTEGER, allowNull: false }
});

Vente.belongsTo(Utilisateur);
Utilisateur.hasMany(Vente);

module.exports = Vente;