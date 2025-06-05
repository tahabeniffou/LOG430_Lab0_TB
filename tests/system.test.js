const { Sequelize, DataTypes } = require('sequelize');

let sequelize, Produit, Vente, LigneVente, Utilisateur, Paiement;

beforeAll(async () => {
  sequelize = new Sequelize('sqlite::memory:', { logging: false });

  Utilisateur = sequelize.define('Utilisateur', {
    nom: DataTypes.STRING,
    role: DataTypes.STRING
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

  Paiement = sequelize.define('Paiement', {
    moyen: DataTypes.STRING,
    montant: DataTypes.FLOAT,
    date: DataTypes.DATE
  });

  Utilisateur.hasMany(Vente);
  Vente.belongsTo(Utilisateur);

  Vente.hasMany(LigneVente);
  LigneVente.belongsTo(Vente);

  Produit.hasMany(LigneVente);
  LigneVente.belongsTo(Produit);

  Vente.hasOne(Paiement);
  Paiement.belongsTo(Vente);

  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

test('Scénario complet : enregistrer une vente avec mise à jour du stock', async () => {
  const user = await Utilisateur.create({ nom: 'Sarah', role: 'Caissière' });

  const produitA = await Produit.create({ nom: 'Eau', prix: 1.0, stock: 10 });
  const produitB = await Produit.create({ nom: 'Jus', prix: 2.5, stock: 5 });

  const vente = await Vente.create({ date: new Date(), total: 0, UtilisateurId: user.id });

  await LigneVente.create({ ProduitId: produitA.id, VenteId: vente.id, quantite: 2, sousTotal: 2.0 });
  await LigneVente.create({ ProduitId: produitB.id, VenteId: vente.id, quantite: 1, sousTotal: 2.5 });

  vente.total = 4.5;
  await vente.save();

  produitA.stock -= 2;
  produitB.stock -= 1;
  await produitA.save();
  await produitB.save();

  await Paiement.create({ moyen: 'carte', montant: 4.5, date: new Date(), VenteId: vente.id });

  const updatedProduitA = await Produit.findByPk(produitA.id);
  const updatedProduitB = await Produit.findByPk(produitB.id);

  expect(updatedProduitA.stock).toBe(8);
  expect(updatedProduitB.stock).toBe(4);

  const lignes = await LigneVente.findAll({ where: { VenteId: vente.id } });
  expect(lignes.length).toBe(2);

  const paiement = await Paiement.findOne({ where: { VenteId: vente.id } });
  expect(paiement).not.toBeNull();
  expect(paiement.montant).toBeCloseTo(4.5);
});
