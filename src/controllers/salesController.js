const sequelize = require('../models');
const Produit = require('../models/Produit');
const Vente = require('../models/Vente');
const LigneVente = require('../models/LigneVente');
const Paiement = require('../models/Paiement');

async function enregistrerVente(produits, utilisateurId) {
  const transaction = await sequelize.transaction();
  try {
    const vente = await Vente.create({ total: 0, date: new Date(), UtilisateurId: utilisateurId }, { transaction });
    let total = 0;

    for (const item of produits) {
      const produit = await Produit.findByPk(item.id, { transaction });
      if (!produit || produit.stock < item.qte) throw new Error('Stock insuffisant');

      produit.stock -= item.qte;
      await produit.save({ transaction });

      const sousTotal = produit.prix * item.qte;
      total += sousTotal;

      await LigneVente.create({ quantite: item.qte, sousTotal, ProduitId: produit.id, VenteId: vente.id }, { transaction });
    }

    vente.total = total;
    await vente.save({ transaction });
    await Paiement.create({ moyen: 'carte', montant: total, date: new Date(), VenteId: vente.id }, { transaction });

    await transaction.commit();
    console.log('✔ Vente enregistrée');
  } catch (e) {
    await transaction.rollback();
    console.error('Erreur transactionnelle :', e.message);
  }
}

async function annulerVente(venteId) {
  const transaction = await sequelize.transaction();
  try {
    const lignes = await LigneVente.findAll({ where: { VenteId: venteId }, transaction });
    for (const ligne of lignes) {
      const produit = await Produit.findByPk(ligne.ProduitId, { transaction });
      produit.stock += ligne.quantite;
      await produit.save({ transaction });
    }
    await LigneVente.destroy({ where: { VenteId: venteId }, transaction });
    await Paiement.destroy({ where: { VenteId: venteId }, transaction });
    await Vente.destroy({ where: { id: venteId }, transaction });
    await transaction.commit();
    console.log('✔ Vente annulée et stock rétabli');
  } catch (e) {
    await transaction.rollback();
    console.error('Erreur lors de l’annulation :', e.message);
  }
}

module.exports = { enregistrerVente, annulerVente };