// src/models/seed.js
const sequelize = require('./index');
const Categorie = require('./Categorie');
const Produit = require('./Produit');
const Utilisateur = require('./Utilisateur');
const Vente = require('./Vente');
const LigneVente = require('./LigneVente');
const Paiement = require('./Paiement');

async function seed() {
  try {
    // 1. Synchroniser les tables (supprime et recrée tout)
    await sequelize.sync({ force: true });
    console.log('Tables créées.');

    // 2. Catégories
    const boissons = await Categorie.create({ nom: 'Boissons' });
    const snacks = await Categorie.create({ nom: 'Snacks' });

    // 3. Produits
    const coca     = await Produit.create({ nom: 'Coca-Cola',           prix: 2.5, stock: 100, CategorieId: boissons.id });
    const pepsi    = await Produit.create({ nom: 'Pepsi',               prix: 2.3, stock:  80, CategorieId: boissons.id });
    const chips    = await Produit.create({ nom: 'Chips BBQ',           prix: 1.99,stock:  50, CategorieId: snacks.id   });
    const chocobar = await Produit.create({ nom: 'Barre chocolatée',    prix: 1.5, stock:  40, CategorieId: snacks.id   });

    // 4. Utilisateurs (caissiers)
    const alice = await Utilisateur.create({ nom: 'Alice', role: 'Caissière' });
    const bob   = await Utilisateur.create({ nom: 'Bob',   role: 'Caissier'   });

    // 5. Une vente exemple
    const vente1 = await Vente.create({
      date: new Date(),
      total: 2.5 + 3.98,     // Coca + 2×Chips
      UtilisateurId: alice.id
    });

    // 6. Lignes de vente
    await LigneVente.create({
      VenteId:   vente1.id,
      ProduitId: coca.id,
      quantite:  1,
      sousTotal: 2.5
    });
    await LigneVente.create({
      VenteId:   vente1.id,
      ProduitId: chips.id,
      quantite:  2,
      sousTotal: 2 * 1.99
    });

    // 7. Paiement pour cette vente
    await Paiement.create({
      VenteId: vente1.id,
      moyen:   'carte',
      montant: vente1.total,
      date:    new Date()
    });

    console.log('Données initiales insérées avec succès !');
    await sequelize.close();
    process.exit(0);
  } catch (err) {
    console.error('Erreur lors du seed:', err);
    process.exit(1);
  }
}

seed();
