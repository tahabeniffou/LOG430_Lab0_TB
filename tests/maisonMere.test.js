const { Sequelize, DataTypes } = require('sequelize');

let sequelize, Magasin, Produit, Vente, LigneVente;

beforeAll(async () => {
  sequelize = new Sequelize('sqlite::memory:', { logging: false });

  Magasin = sequelize.define('Magasin', {
    nom: DataTypes.STRING,
    adresse: DataTypes.STRING
  });

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

  Magasin.hasMany(Produit);
  Produit.belongsTo(Magasin);

  Magasin.hasMany(Vente);
  Vente.belongsTo(Magasin);

  Vente.hasMany(LigneVente);
  LigneVente.belongsTo(Vente);

  Produit.hasMany(LigneVente);
  LigneVente.belongsTo(Produit);

  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

test('La maison mère génère un rapport consolidé des ventes', async () => {
  const magasin = await Magasin.create({ nom: 'TestMag', adresse: '123 rue' });
  const produit = await Produit.create({ nom: 'Fanta', prix: 2, stock: 10, MagasinId: magasin.id });
  const vente = await Vente.create({ total: 4, date: new Date(), MagasinId: magasin.id });
  await LigneVente.create({ quantite: 2, sousTotal: 4, ProduitId: produit.id, VenteId: vente.id });

  // Simule la logique du rapport
  const ventes = await Vente.findAll({ where: { MagasinId: magasin.id } });
  const totalVentes = ventes.reduce((acc, v) => acc + (v.total || 0), 0);

  expect(totalVentes).toBe(4);

  const lignes = await LigneVente.findAll({ include: [Produit] });
  const produitsVendus = {};
  lignes.forEach(lv => {
    const nom = lv.Produit?.nom || 'Inconnu';
    produitsVendus[nom] = (produitsVendus[nom] || 0) + lv.quantite;
  });

  expect(produitsVendus['Fanta']).toBe(2);
});