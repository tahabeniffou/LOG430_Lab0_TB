const { Sequelize, DataTypes } = require('sequelize');

let sequelize, Produit;

beforeAll(async () => {
  sequelize = new Sequelize('sqlite::memory:', { logging: false });

  Produit = sequelize.define('Produit', {
    nom: DataTypes.STRING,
    prix: DataTypes.FLOAT,
    stock: DataTypes.INTEGER
  });

  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

test('Créer un produit valide', async () => {
  const p = await Produit.create({ nom: 'Fanta', prix: 2.0, stock: 20 });
  expect(p.nom).toBe('Fanta');
  expect(p.prix).toBeGreaterThan(0);
  expect(p.stock).toBeGreaterThanOrEqual(0);
});
