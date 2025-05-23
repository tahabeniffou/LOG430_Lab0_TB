const Produit = require('../src/models/Produit');
const sequelize = require('../src/models');

beforeAll(() => sequelize.sync({ force: true }));

test('Créer un produit valide', async () => {
  const p = await Produit.create({ nom: 'Fanta', prix: 2.0, stock: 20 });
  expect(p.nom).toBe('Fanta');
  expect(p.prix).toBeGreaterThan(0);
  expect(p.stock).toBeGreaterThanOrEqual(0);
});
