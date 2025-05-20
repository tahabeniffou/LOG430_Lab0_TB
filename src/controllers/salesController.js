const sequelize = require('../models');
const Product = require('../models/Product');
const Sale = require('../models/Sale');

async function enregistrerVente(produits) {
  const transaction = await sequelize.transaction();

  try {
    const nouvelleVente = await Sale.create({ total: 0 }, { transaction });

    let total = 0;
    for (const p of produits) {
      const produit = await Product.findByPk(p.id, { transaction });

      if (!produit || produit.stock < p.quantite) {
        throw new Error('Produit indisponible ou stock insuffisant.');
      }

      total += produit.prix * p.quantite;
      produit.stock -= p.quantite;

      await produit.save({ transaction });
    }

    nouvelleVente.total = total;
    await nouvelleVente.save({ transaction });

    await transaction.commit();
    return nouvelleVente;

  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

module.exports = { enregistrerVente };
