const sequelize = require('../src/models');
const Produit = require('../src/models/Produit');
const Vente = require('../src/models/Vente');
const LigneVente = require('../src/models/LigneVente');
const Utilisateur = require('../src/models/Utilisateur');
const Paiement = require('../src/models/Paiement');

beforeAll(() => sequelize.sync({ force: true }));

test('Scénario complet : enregistrer une vente avec mise à jour du stock', async () => {
  // Étape 1 : données de base
  const user = await Utilisateur.create({ nom: 'Sarah', role: 'Caissière' });

  const produitA = await Produit.create({ nom: 'Eau', prix: 1.0, stock: 10 });
  const produitB = await Produit.create({ nom: 'Jus', prix: 2.5, stock: 5 });

  // Étape 2 : enregistrer une vente
  const vente = await Vente.create({ date: new Date(), total: 0, UtilisateurId: user.id });

  const ligne1 = await LigneVente.create({ ProduitId: produitA.id, VenteId: vente.id, quantite: 2, sousTotal: 2.0 });
  const ligne2 = await LigneVente.create({ ProduitId: produitB.id, VenteId: vente.id, quantite: 1, sousTotal: 2.5 });

  // Mise à jour du total et stock
  vente.total = 4.5;
  await vente.save();

  produitA.stock -= 2;
  produitB.stock -= 1;
  await produitA.save();
  await produitB.save();

  await Paiement.create({ moyen: 'carte', montant: 4.5, date: new Date(), VenteId: vente.id });

  // Étape 3 : assertions
  const updatedProduitA = await Produit.findByPk(produitA.id);
  const updatedProduitB = await Produit.findByPk(produitB.id);

  expect(updatedProduitA.stock).toBe(8);
  expect(updatedProduitB.stock).toBe(4);

  const lignes = await LigneVente.findAll({ where: { VenteId: vente.id } });
  expect(lignes.length).toBe(2);

  const paiement = await Paiement.findOne({ where: { VenteId: vente.id } });
  expect(paiement).not.toBeNull();
  expect(paiement.montant).toBeCloseTo(4.5);
});
