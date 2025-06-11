import Utilisateur from '../../../models/Utilisateur.js';


export default {
  listerTous() {
    return Utilisateur.findAll();
  },

  trouverParId(id) {
    return Utilisateur.findByPk(id);
  },

  creer(data) {
    return Utilisateur.create(data);
  },

  async mettreAJour(id, data) {
    await Utilisateur.update(data, { where: { id } });
    return Utilisateur.findByPk(id);
  },

  supprimer(id) {
    return Utilisateur.destroy({ where: { id } });
  }
};
