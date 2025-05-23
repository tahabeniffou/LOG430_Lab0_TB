const Produit = require('../Models/Produit');
const Categorie = require('../Models/Categorie');

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