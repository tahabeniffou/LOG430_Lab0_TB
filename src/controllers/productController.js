const Produit = require('../models/Produit');
const Categorie = require('../models/Categorie');

//Recherche les produits par nom pour un magasin donné.
async function rechercherProduitParNom(nom, magasinId) {
  const produits = await Produit.findAll({
    where: { nom, magasinId },
    include: Categorie
  });
  return produits;
}

//Affiche le stock de tous les produits pour un magasin donné.
async function afficherStock(magasinId) {
  const produits = await Produit.findAll({
    where: { magasinId },
    include: Categorie
  });
  return produits;
}

module.exports = { rechercherProduitParNom, afficherStock };