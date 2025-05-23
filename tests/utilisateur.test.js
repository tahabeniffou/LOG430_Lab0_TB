const Utilisateur = require('../src/models/Utilisateur');
const sequelize = require('../src/models');

beforeAll(() => sequelize.sync({ force: true }));

test('Créer un utilisateur', async () => {
  const u = await Utilisateur.create({ nom: 'Emma', role: 'Caissier' });
  expect(u.nom).toBe('Emma');
  expect(u.role).toBe('Caissier');
});
