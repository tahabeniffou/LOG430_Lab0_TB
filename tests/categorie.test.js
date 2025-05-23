const Categorie = require('../src/models/Categorie');
const sequelize = require('../src/models');

beforeAll(() => sequelize.sync({ force: true }));

test('Créer une catégorie', async () => {
  const c = await Categorie.create({ nom: 'Confiseries' });
  expect(c.nom).toBe('Confiseries');
});
