const sequelize = require('./index');
const Produit = require('./Produit');
const Categorie = require('./Categorie');
const Vente = require('./Vente');
const LigneVente = require('./LigneVente');
const Utilisateur = require('./Utilisateur');
const Paiement = require('./Paiement');

async function seed() {
  await sequelize.sync({ force: true }); // Réinitialise la base

  // 🔸 Catégories
  const boissons = await Categorie.create({ nom: 'Boissons' });
  const snacks = await Categorie.create({ nom: 'Snacks' });

  // 🔸 Produits
  const produit1 = await Produit.create({ nom: 'Coca-Cola', prix: 2.50, stock: 100, CategorieId: boissons.id });
  const produit2 = await Produit.create({ nom: 'Pepsi', prix: 2.30, stock: 80, CategorieId: boissons.id });
  const produit3 = await Produit.create({ nom: 'Chips BBQ', prix: 1.99, stock: 50, CategorieId: snacks.id });
  const produit4 = await Produit.create({ nom: 'Barre chocolatée', prix: 1.50, stock: 40, CategorieId: snacks.id });

  // 🔸 Utilisateurs
  const employe1 = await Utilisateur.create({ nom: 'Alice', role: 'Caissière' });
  const employe2 = await Utilisateur.create({ nom: 'Bob', role: 'Caissier' });

  // 🔸 Vente
  const vente1 = await Vente.create({
    date: new Date(),
    total: 5.80,
    UtilisateurId: employe1.id
  });

  // 🔸 Lignes de vente
  await LigneVente.create({ quantite: 1, sousTotal: 2.50, ProduitId: produit1.id, VenteId: vente1.id });
  await LigneVente.create({ quantite: 2, sousTotal: 3.30, ProduitId: produit3.id, VenteId: vente1.id });

  // 🔸 Paiement
  await Paiement.create({ moyen: 'carte', montant: 5.80, date: new Date(), VenteId: vente1.id });

  console.log('✔ Base de données remplie.');
  await sequelize.close();
}

seed();

