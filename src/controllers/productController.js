const Produit = require('../models/Produit');
const Categorie = require('../models/Categorie');

async function rechercherProduitParNom(nom) {
  const produits = await Produit.findAll({
    where: { nom },
    include: Categorie
  });
  return produits;
}

async function afficherStock() {
  const produits = await Produit.findAll({ include: Categorie });
  return produits;
}

module.exports = { rechercherProduitParNom, afficherStock };