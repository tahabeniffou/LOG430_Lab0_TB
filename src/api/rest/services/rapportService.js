import Vente from '../../../models/Vente.js';
import LigneVente from '../../../models/LigneVente.js';
import Produit from '../../../models/Produit.js';
import Magasin from '../../../models/Magasin.js';

export default {
  async generer(type, { start, end }) {
    if (type === 'ventes') {
      return Vente.findAll({
        include: [
          { model: Magasin },
          { model: LigneVente, include: [Produit] }
        ],
        where: start && end ? { date: { $between: [start, end] } } : undefined
      });
    }
    if (type === 'dashboard') {
      // Implémentez la logique dashboard
      return Vente.findAll();
    }
    throw new Error('Type de rapport invalide');
  },

  trouverParId(id) {
    return Vente.findByPk(id, {
      include: [
        { model: Magasin },
        { model: LigneVente, include: [Produit] }
      ]
    });
  }
};