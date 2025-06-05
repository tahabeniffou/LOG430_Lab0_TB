const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Utilisateur = sequelize.define('Utilisateur', {
  nom: DataTypes.STRING,
  role: DataTypes.STRING
});

module.exports = Utilisateur;