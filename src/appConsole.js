require('./models/sync');
const { enregistrerVente } = require('./controllers/salesController');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Exemple simplifié d’enregistrement d'une vente via console
async function main() {
  rl.question('Entrez les IDs des produits à vendre (ex: 1,2,3): ', async (answer) => {
    const ids = answer.split(',').map(id => parseInt(id.trim()));
    const produits = ids.map(id => ({ id, quantite: 1 })); // simplifié, quantité toujours 1 ici

    try {
      const vente = await enregistrerVente(produits);
      console.log(`Vente enregistrée ! Total : ${vente.total} $`);
    } catch (error) {
      console.error(`Erreur lors de la vente : ${error.message}`);
    }

    rl.close();
  });
}

main();

const readline = require('readline');

function menu() {
  console.log('\n=== Menu Caisse POS ===');
  console.log('1. Rechercher un produit');
  console.log('2. Effectuer une vente');
  console.log('3. Annuler une vente');
  console.log('4. Consulter le stock');
  console.log('5. Quitter');

  rl.question('Choix : ', (choix) => {
    switch (choix.trim()) {
      case '1':
        // appeler recherche produit
        break;
      case '2':
        // appeler vente
        break;
      case '3':
        // retour
        break;
      case '4':
        // afficher stock
        break;
      case '5':
        rl.close();
        break;
      default:
        console.log('Option invalide.');
        menu();
    }
  });
}

menu();