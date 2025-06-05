const { Sequelize, DataTypes } = require('sequelize');

let sequelize, Produit, Vente, LigneVente, Utilisateur;

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

  Utilisateur.hasMany(Vente);
  Vente.belongsTo(Utilisateur);

  Vente.hasMany(LigneVente);
  LigneVente.belongsTo(Vente);

  Produit.hasMany(LigneVente);
  LigneVente.belongsTo(Produit);

  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

test('Annuler une vente : restituer le stock et supprimer la vente', async () => {
  const user = await Utilisateur.create({ nom: 'Youssef', role: 'Caissier' });
  const produit = await Produit.create({ nom: 'Bouteille d\'eau', prix: 1.5, stock: 20 });

  const vente = await Vente.create({ date: new Date(), total: 3.0, UtilisateurId: user.id });
  await LigneVente.create({ ProduitId: produit.id, VenteId: vente.id, quantite: 2, sousTotal: 3.0 });

  produit.stock -= 2;
  await produit.save();

  produit.stock += 2;
  await produit.save();

  await LigneVente.destroy({ where: { VenteId: vente.id } });
  await Vente.destroy({ where: { id: vente.id } });

  const produitMisAJour = await Produit.findByPk(produit.id);
  const venteAnnulee = await Vente.findByPk(vente.id);
  const lignes = await LigneVente.findAll({ where: { VenteId: vente.id } });

  expect(produitMisAJour.stock).toBe(20);
  expect(venteAnnulee).toBeNull();
  expect(lignes.length).toBe(0);
});
