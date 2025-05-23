const { Sequelize, DataTypes } = require('sequelize');

let sequelize, Vente, Paiement;

beforeAll(async () => {
  sequelize = new Sequelize('sqlite::memory:', { logging: false });

  Vente = sequelize.define('Vente', {
    total: DataTypes.FLOAT,
    date: DataTypes.DATE
  });

  Paiement = sequelize.define('Paiement', {
    moyen: DataTypes.STRING,
    montant: DataTypes.FLOAT,
    date: DataTypes.DATE
  });

  Vente.hasOne(Paiement);
  Paiement.belongsTo(Vente);

  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

test('Créer un paiement lié à une vente', async () => {
  const vente = await Vente.create({ total: 5.0, date: new Date() });
  const pay = await Paiement.create({
    moyen: 'espèces',
    montant: 5.0,
    date: new Date(),
    VenteId: vente.id
  });

  expect(pay.montant).toBe(5.0);
  expect(pay.moyen).toBe('espèces');
});
