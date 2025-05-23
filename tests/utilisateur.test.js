const { Sequelize, DataTypes } = require('sequelize');

// 1. Base en mémoire (spécialement pour les tests)
const sequelize = new Sequelize('sqlite::memory:', { logging: false });

// 2. Définir un modèle simple pour tester
const Utilisateur = sequelize.define('Utilisateur', {
  nom: DataTypes.STRING,
  role: DataTypes.STRING
});

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

test('Créer un utilisateur', async () => {
  const u = await Utilisateur.create({ nom: 'Taha', role: 'Admin' });
  expect(u.nom).toBe('Taha');
  expect(u.role).toBe('Admin');
});
