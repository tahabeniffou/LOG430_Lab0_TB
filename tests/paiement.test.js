const Paiement = require('../src/models/Paiement');
const Vente = require('../src/models/Vente');
const sequelize = require('../src/models');

beforeAll(() => sequelize.sync({ force: true }));

test('Créer un paiement lié à une vente', async () => {
  const vente = await Vente.create({ total: 5.0, date: new Date() });
  const pay = await Paiement.create({ moyen: 'espèces', montant: 5.0, date: new Date(), VenteId: vente.id });
  expect(pay.montant).toBe(5.0);
  expect(pay.moyen).toBe('espèces');
});
