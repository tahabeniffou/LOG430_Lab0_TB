const LigneVente = require('../src/models/LigneVente');
const Produit = require('../src/models/Produit');
const Vente = require('../src/models/Vente');
const sequelize = require('../src/models');

beforeAll(() => sequelize.sync({ force: true }));

test('Créer une ligne de vente avec produit et vente', async () => {
  const produit = await Produit.create({ nom: 'Sprite', prix: 2.1, stock: 30 });
  const vente = await Vente.create({ total: 0, date: new Date() });
  const ligne = await LigneVente.create({ quantite: 2, sousTotal: 4.2, ProduitId: produit.id, VenteId: vente.id });

  expect(ligne.quantite).toBe(2);
  expect(ligne.sousTotal).toBeCloseTo(4.2);
});
