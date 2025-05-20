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
