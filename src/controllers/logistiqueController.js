const DemandeReappro = require('../models/DemandeReappro');
const CentreLogistique = require('../models/CentreLogistique');
const Produit = require('../models/Produit');

async function afficherStockLogistique() {
  return CentreLogistique.findAll({ include: Produit });
}

async function reapprovisionnerMagasin(produitId, magasinId, quantite) {
  // On enregistre uniquement la demande, sans toucher aux stocks
  await DemandeReappro.create({
    produitId,
    quantite,
    date: new Date()
  });
}

module.exports = { afficherStockLogistique, reapprovisionnerMagasin };