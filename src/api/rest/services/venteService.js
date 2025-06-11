import Vente from '../../../models/Vente.js';
import LigneVente from '../../../models/LigneVente.js';

export default {
  listerTous() {
    return Produit.findAll();
  },

  trouverParId(id) {
    return Produit.findByPk(id);
  },

  creer(data) {
    return Produit.create(data);
  },

  async mettreAJour(id, data) {
    await Produit.update(data, { where: { id } });
    return Produit.findByPk(id);
  },

  supprimer(id) {
    return Produit.destroy({ where: { id } });
  }
};
