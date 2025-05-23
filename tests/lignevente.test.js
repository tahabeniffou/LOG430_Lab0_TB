const { Sequelize, DataTypes } = require('sequelize');

let sequelize, Produit, Vente, LigneVente;

beforeAll(async () => {
  sequelize = new Sequelize('sqlite::memory:', { logging: false });

  Produit = sequelize.define('Produit', {
    nom: DataTypes.STRING,
    prix: DataTypes.FLOAT,
    stock: DataTypes.INTEGER
  });

  Vente = sequelize.define('Vente', {
    total: DataTypes.FLOAT,
    date: DataTypes.DATE
  });

  LigneVente = sequelize.define('LigneVente', {
    quantite: DataTypes.INTEGER,
    sousTotal: DataTypes.FLOAT
  });

  Produit.hasMany(LigneVente);
  Vente.hasMany(LigneVente);
  LigneVente.belongsTo(Produit);
  LigneVente.belongsTo(Vente);

  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

test('Créer une ligne de vente avec produit et vente', async () => {
  const produit = await Produit.create({ nom: 'Sprite', prix: 2.1, stock: 30 });
  const vente = await Vente.create({ total: 0, date: new Date() });

  const ligne = await LigneVente.create({
    quantite: 2,
    sousTotal: 4.2,
    ProduitId: produit.id,
    VenteId: vente.id
  });

  expect(ligne.quantite).toBe(2);
  expect(ligne.sousTotal).toBeCloseTo(4.2);
});
