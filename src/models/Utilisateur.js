const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Utilisateur = sequelize.define('Utilisateur', {
  nom: DataTypes.STRING,
  role: DataTypes.STRING,
  magasinId: { type: DataTypes.INTEGER, allowNull: false }
});

module.exports = Utilisateur;