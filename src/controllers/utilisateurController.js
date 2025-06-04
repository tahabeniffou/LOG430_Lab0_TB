const Utilisateur = require('../models/Utilisateur');

async function getUtilisateursParMagasin(magasinId) {
  return Utilisateur.findAll({ where: { magasinId } });
}

module.exports = { getUtilisateursParMagasin };