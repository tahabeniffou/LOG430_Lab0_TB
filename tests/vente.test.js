const { Sequelize, DataTypes } = require('sequelize');

let sequelize, Vente, Utilisateur;

beforeAll(async () => {
  sequelize = new Sequelize('sqlite::memory:', { logging: false });

  Utilisateur = sequelize.define('Utilisateur', {
    nom: DataTypes.STRING,
    role: DataTypes.STRING
  });

  Vente = sequelize.define('Vente', {
    total: DataTypes.FLOAT,
    date: DataTypes.DATE
  });

  Utilisateur.hasMany(Vente);
  Vente.belongsTo(Utilisateur);

  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

test('Créer une vente liée à un utilisateur', async () => {
  const user = await Utilisateur.create({ nom: 'Léo', role: 'Caissier' });
  const vente = await Vente.create({ total: 10.5, date: new Date(), UtilisateurId: user.id });
  expect(vente.total).toBeCloseTo(10.5);
});
