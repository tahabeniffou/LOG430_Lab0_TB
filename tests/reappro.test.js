const { Sequelize, DataTypes } = require('sequelize');

let sequelize, Produit, DemandeReappro;

beforeAll(async () => {
  sequelize = new Sequelize('sqlite::memory:', { logging: false });

  Produit = sequelize.define('Produit', {
    nom: DataTypes.STRING,
    prix: DataTypes.FLOAT,
    stock: DataTypes.INTEGER
  });

  DemandeReappro = sequelize.define('DemandeReappro', {
    produitId: DataTypes.INTEGER,
    quantite: DataTypes.INTEGER,
    date: DataTypes.DATE
  });

  Produit.hasMany(DemandeReappro, { foreignKey: 'produitId' });
  DemandeReappro.belongsTo(Produit, { foreignKey: 'produitId' });

  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

test('Créer une demande de réapprovisionnement', async () => {
  const produit = await Produit.create({ nom: 'Pepsi', prix: 2.3, stock: 80 });
  const demande = await DemandeReappro.create({ produitId: produit.id, quantite: 5, date: new Date() });

  expect(demande.produitId).toBe(produit.id);
  expect(demande.quantite).toBe(5);

  const demandes = await DemandeReappro.findAll({ where: { produitId: produit.id } });
  expect(demandes.length).toBe(1);
});