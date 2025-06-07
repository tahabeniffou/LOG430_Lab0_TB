const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const Categorie = require('./Categorie');
const CentreLogistique = require('./CentreLogistique');

const Produit = sequelize.define('Produit', {
  nom: DataTypes.STRING,
  prix: DataTypes.FLOAT,
  stock: DataTypes.INTEGER,
  magasinId: { type: DataTypes.INTEGER, allowNull: false }
});

Produit.belongsTo(Categorie);
Categorie.hasMany(Produit);

Produit.hasOne(CentreLogistique, { foreignKey: 'ProduitId' });
CentreLogistique.belongsTo(Produit, { foreignKey: 'ProduitId' });

module.exports = Produit;