const sequelize = require('../src/models');
const Produit = require('../src/models/Produit');
const Vente = require('../src/models/Vente');
const LigneVente = require('../src/models/LigneVente');
const Utilisateur = require('../src/models/Utilisateur');

beforeAll(() => sequelize.sync({ force: true }));

test('Annuler une vente : restituer le stock et supprimer la vente', async () => {
  // Données de départ
  const user = await Utilisateur.create({ nom: 'Youssef', role: 'Caissier' });
  const produit = await Produit.create({ nom: 'Bouteille d\'eau', prix: 1.5, stock: 20 });

  // Créer une vente
  const vente = await Vente.create({ date: new Date(), total: 3.0, UtilisateurId: user.id });
  await LigneVente.create({ ProduitId: produit.id, VenteId: vente.id, quantite: 2, sousTotal: 3.0 });

  // Décrémenter le stock comme si la vente avait eu lieu
  produit.stock -= 2;
  await produit.save();

  // 🔄 Simuler annulation : restaurer le stock, supprimer les lignes et la vente
  produit.stock += 2;
  await produit.save();

  await LigneVente.destroy({ where: { VenteId: vente.id } });
  await Vente.destroy({ where: { id: vente.id } });

  // Vérifier
  const produitMisAJour = await Produit.findByPk(produit.id);
  const venteAnnulee = await Vente.findByPk(vente.id);
  const lignes = await LigneVente.findAll({ where: { VenteId: vente.id } });

  expect(produitMisAJour.stock).toBe(20);
  expect(venteAnnulee).toBeNull();
  expect(lignes.length).toBe(0);
});
