const inquirer = require('inquirer');
const { Separator } = require('inquirer');


const { rechercherProduitParNom, afficherStock } = require('./controllers/productController');
const { enregistrerVente, annulerVente } = require('./controllers/salesController');
const Utilisateur = require('./Models/Utilisateur');
const Vente = require('./Models/Vente');
const Paiement = require('./Models/Paiement');

// 🔒 Sélection de l’utilisateur actif
async function selectionnerUtilisateur() {
  const utilisateurs = await Utilisateur.findAll();

  if (utilisateurs.length === 0) {
    console.log("❌ Aucun utilisateur trouvé. Tu dois d'abord lancer le seed.");
    process.exit(1);
  }

  const { utilisateurId } = await inquirer.prompt([
    {
      type: 'list',
      name: 'utilisateurId',
      message: '👤 Qui est connecté ?',
      choices: utilisateurs.map(u => ({
        name: `${u.nom} (${u.role})`,
        value: u.id
      }))
    }
  ]);

  return utilisateurs.find(u => u.id === utilisateurId);
}

// 🧭 Menu principal
async function mainMenu(utilisateur) {
  while (true) {
    console.clear();

    const { action } = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: `=== 💼 Caisse POS — Connecté : ${utilisateur.nom} (${utilisateur.role}) ===`,
        choices: [
          new Separator('─── Menu Principal ───'),
          { name: '🛒 Rechercher un produit', value: 'recherche' },
          { name: '💰 Enregistrer une vente', value: 'vente' },
          { name: '↩️ Annuler une vente', value: 'annuler' },
          { name: '📦 Consulter le stock', value: 'stock' },
          new Separator(),
          { name: '❌ Quitter', value: 'exit' }
        ]
      }
    ]);

    switch (action) {
      case 'recherche': {
        console.clear();
        const { nom } = await inquirer.prompt({
          type: 'input',
          name: 'nom',
          message: '🔎 Entrez le nom du produit à rechercher :'
        });

        const results = await rechercherProduitParNom(nom);

        console.log('\nRésultats :\n');
        if (results.length === 0) {
          console.log('❌ Aucun produit trouvé.');
        } else {
          results.forEach(p =>
            console.log(`🔸 ${p.nom} (${p.Categorie?.nom || 'Sans catégorie'}) - $${p.prix} | Stock: ${p.stock}`)
          );
        }

        await pause();
        break;
      }

      case 'vente': {
        console.clear();
        const produits = await afficherStock();

        const { produitsChoisis } = await inquirer.prompt([
          {
            type: 'checkbox',
            name: 'produitsChoisis',
            message: '🛍️ Sélectionnez les produits à vendre :',
            choices: produits.map(p => ({
              name: `${p.nom} ($${p.prix}) - Stock: ${p.stock}`,
              value: p.nom
            }))
          }
        ]);

        if (produitsChoisis.length === 0) {
          console.log('⚠️ Aucun produit sélectionné.');
          await pause();
          break;
        }

        const items = [];

        for (const produitNom of produitsChoisis) {
          const produit = produits.find(p => p.nom === produitNom);

          const { quantite } = await inquirer.prompt([
            {
              type: 'number',
              name: 'quantite',
              message: `Quantité pour ${produit.nom} :`,
              validate: q => (q > 0 ? true : 'Quantité invalide')
            }
          ]);

          items.push({ id: produit.id, qte: quantite });
        }

        await enregistrerVente(items, utilisateur.id);
        console.log('\n✅ Vente enregistrée avec succès.');
        await pause();
        break;
      }

      case 'annuler': {
        console.clear();

        const ventes = await Vente.findAll({
          order: [['date', 'DESC']],
          limit: 10,
          include: [{ model: Paiement }]
        });

        if (ventes.length === 0) {
          console.log('⚠️ Aucune vente à annuler.');
          await pause();
          break;
        }

        const { venteId } = await inquirer.prompt({
          type: 'list',
          name: 'venteId',
          message: '📄 Sélectionne une vente à annuler :',
          choices: ventes.map(v => ({
            name: `#${v.id} | ${v.date.toLocaleString()} | Total: $${v.total}`,
            value: v.id
          }))
        });

        await annulerVente(venteId);
        console.log('✅ Vente annulée avec succès.');
        await pause();
        break;
      }

      case 'stock': {
        console.clear();
        const produits = await afficherStock();
        console.log('\n📦 État du stock :\n');
        produits.forEach(p =>
          console.log(`- ${p.nom} (${p.Categorie?.nom || 'Sans catégorie'}) - Stock: ${p.stock}`)
        );
        await pause();
        break;
      }

      case 'exit':
        console.clear();
        console.log('👋 Merci d’avoir utilisé le POS. À bientôt !');
        process.exit(0);
    }
  }
}

// 🔁 Pause pour lisibilité
async function pause() {
  await inquirer.prompt({
    type: 'input',
    name: 'pause',
    message: '\nAppuie sur [Entrée] pour revenir au menu...'
  });
}

// 🚀 Lancement
async function start() {
  console.clear();
  const utilisateur = await selectionnerUtilisateur();
  await mainMenu(utilisateur);
}

start();
