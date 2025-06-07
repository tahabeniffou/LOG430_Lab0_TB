const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const Produit = require('./Produit');

const DemandeReappro = sequelize.define('DemandeReappro', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  produitId: { type: DataTypes.INTEGER, allowNull: false, references: { model: Produit, key: 'id' } },
  quantite: { type: DataTypes.INTEGER, allowNull: false },
  date: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
}, {
  tableName: 'DemandeReappros'
});

DemandeReappro.belongsTo(Produit, { foreignKey: 'produitId' });
Produit.hasMany(DemandeReappro, { foreignKey: 'produitId' });

module.exports = DemandeReappro;