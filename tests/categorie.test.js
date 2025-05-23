const { Sequelize, DataTypes } = require('sequelize');

let sequelize;
let Categorie;

beforeAll(async () => {
  sequelize = new Sequelize('sqlite::memory:', { logging: false });

  Categorie = sequelize.define('Categorie', {
    nom: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

test('Créer une catégorie', async () => {
  const c = await Categorie.create({ nom: 'Confiseries' });
  expect(c.nom).toBe('Confiseries');
});
