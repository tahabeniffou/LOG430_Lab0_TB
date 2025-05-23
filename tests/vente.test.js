const Vente = require('../src/models/Vente');
const Utilisateur = require('../src/models/Utilisateur');
const sequelize = require('../src/models');

beforeAll(() => sequelize.sync({ force: true }));

test('Créer une vente liée à un utilisateur', async () => {
  const user = await Utilisateur.create({ nom: 'Léo', role: 'Caissier' });
  const vente = await Vente.create({ total: 10.5, date: new Date(), UtilisateurId: user.id });
  expect(vente.total).toBeCloseTo(10.5);
});
