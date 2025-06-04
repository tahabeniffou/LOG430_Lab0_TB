const sequelize = require('../models');
const Produit = require('../models/Produit');
const Vente = require('../models/Vente');
const LigneVente = require('../models/LigneVente');
const Paiement = require('../models/Paiement');

/**
 * Enregistre une vente pour un magasin donné.
 * @param {Array} produits - Liste des produits [{ id, qte }]
 * @param {number} utilisateurId - ID de l'utilisateur (caissier)
 * @param {number} magasinId - ID du magasin
 */
async function enregistrerVente(produits, utilisateurId, magasinId) {
  const transaction = await sequelize.transaction();
  try {
    const vente = await Vente.create(
      { total: 0, date: new Date(), UtilisateurId: utilisateurId, magasinId },
      { transaction }
    );
    let total = 0;

    for (const item of produits) {
      const produit = await Produit.findOne({ where: { id: item.id, magasinId }, transaction });
      if (!produit || produit.stock < item.qte) throw new Error('Stock insuffisant ou produit inexistant dans ce magasin');

      produit.stock -= item.qte;
      await produit.save({ transaction });

      const sousTotal = produit.prix * item.qte;
      total += sousTotal;

      await LigneVente.create(
        { quantite: item.qte, sousTotal, ProduitId: produit.id, VenteId: vente.id, magasinId },
        { transaction }
      );
    }

    vente.total = total;
    await vente.save({ transaction });
    await Paiement.create(
      { moyen: 'carte', montant: total, date: new Date(), VenteId: vente.id, magasinId },
      { transaction }
    );

    await transaction.commit();
    console.log('✔ Vente enregistrée');
  } catch (e) {
    await transaction.rollback();
    console.error('Erreur transactionnelle :', e.message);
  }
}

/**
 * Annule une vente et restaure le stock pour un magasin donné.
 * @param {number} venteId - ID de la vente à annuler
 * @param {number} magasinId - ID du magasin
 */
async function annulerVente(venteId, magasinId) {
  const transaction = await sequelize.transaction();
  try {
    const lignes = await LigneVente.findAll({ where: { VenteId: venteId, magasinId }, transaction });
    for (const ligne of lignes) {
      const produit = await Produit.findOne({ where: { id: ligne.ProduitId, magasinId }, transaction });
      if (produit) {
        produit.stock += ligne.quantite;
        await produit.save({ transaction });
      }
    }
    await LigneVente.destroy({ where: { VenteId: venteId, magasinId }, transaction });
    await Paiement.destroy({ where: { VenteId: venteId, magasinId }, transaction });
    await Vente.destroy({ where: { id: venteId, magasinId }, transaction });
    await transaction.commit();
    console.log('✔ Vente annulée et stock rétabli');
  } catch (e) {
    await transaction.rollback();
    console.error('Erreur lors de l’annulation :', e.message);
  }
}

module.exports = { enregistrerVente, annulerVente };