const inquirer = require('inquirer');
const { rechercherProduitParNom, afficherStock } = require('./controllers/productController');
const { enregistrerVente, annulerVente } = require('./controllers/salesController');

async function mainMenu() {
  while (true) {
    const { action } = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: '=== Bienvenue sur la caisse POS ===',
        choices: [
          { name: '🛒 Rechercher un produit', value: 'recherche' },
          { name: '💰 Enregistrer une vente', value: 'vente' },
          { name: '↩️ Annuler une vente', value: 'annuler' },
          { name: '📦 Consulter le stock', value: 'stock' },
          { name: '❌ Quitter', value: 'exit' }
        ]
      }
    ]);

    switch (action) {
      case 'recherche': {
        const { nom } = await inquirer.prompt({
          type: 'input',
          name: 'nom',
          message: 'Nom du produit :'
        });

        const results = await rechercherProduitParNom(nom);

        if (results.length === 0) {
          console.log('❌ Aucun produit trouvé.');
        } else {
          results.forEach(p =>
            console.log(`🔸 ${p.nom} (${p.Categorie?.nom || 'Sans catégorie'}) - $${p.prix} | Stock: ${p.stock}`)
          );
        }
        break;
      }

      case 'vente': {
        const produits = await afficherStock();

        const { produitsChoisis } = await inquirer.prompt([
          {
            type: 'checkbox',
            name: 'produitsChoisis',
            message: 'Sélectionnez les produits à vendre :',
            choices: produits.map(p => ({
              name: `${p.nom} ($${p.prix}) - Stock: ${p.stock}`,
              value: p.id
            }))
          }
        ]);

        if (produitsChoisis.length === 0) {
          console.log('⚠️ Aucun produit sélectionné.');
          break;
        }

        const items = [];

        for (const produitId of produitsChoisis) {
          const { quantite } = await inquirer.prompt([
            {
              type: 'number',
              name: 'quantite',
              message: `Quantité pour le produit ID ${produitId} :`,
              validate: q => (q > 0 ? true : 'Quantité invalide')
            }
          ]);
          items.push({ id: produitId, qte: quantite });
        }

        await enregistrerVente(items, 1); // Utilisateur ID 1 par défaut
        break;
      }

      case 'annuler': {
        const { id } = await inquirer.prompt({
          type: 'input',
          name: 'id',
          message: 'ID de la vente à annuler :'
        });

        await annulerVente(parseInt(id));
        break;
      }

      case 'stock': {
        const produits = await afficherStock();
        produits.forEach(p =>
          console.log(`- ${p.nom} (${p.Categorie?.nom || 'Sans catégorie'}) - Stock: ${p.stock}`)
        );
        break;
      }

      case 'exit':
        console.log('👋 Merci d’avoir utilisé le POS.');
        process.exit(0);
    }
  }
}

mainMenu();
