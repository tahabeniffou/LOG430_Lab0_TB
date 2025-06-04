const inquirer = require('inquirer');
const { Separator } = require('inquirer');
const axios = require('axios');

const API_URL = 'http://api:3000';

// 🔒 Sélection de la succursale (magasin)
async function selectionnerMagasin() {
  const { data: magasins } = await axios.get(`${API_URL}/maison-mere/magasins`);
  if (!magasins || magasins.length === 0) {
    console.log("❌ Aucun magasin trouvé. Tu dois d'abord lancer le seed.");
    process.exit(1);
  }
  const { magasinId } = await inquirer.prompt([
    {
      type: 'list',
      name: 'magasinId',
      message: '🏬 Dans quelle succursale êtes-vous ?',
      choices: magasins.map(m => ({
        name: `${m.nom} (${m.adresse})`,
        value: m.id
      }))
    }
  ]);
  return magasins.find(m => m.id === magasinId);
}

// 🔒 Sélection de l’utilisateur actif pour un magasin donné
async function selectionnerUtilisateur(magasinId) {
  const { data: utilisateurs } = await axios.get(`${API_URL}/magasins/${magasinId}/utilisateurs`);
  if (!utilisateurs || utilisateurs.length === 0) {
    console.log("❌ Aucun utilisateur trouvé pour cette succursale.");
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
async function mainMenu(utilisateur, magasin) {
  while (true) {
    console.clear();

    const { action } = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: `=== 💼 Caisse POS — ${magasin.nom} — Connecté : ${utilisateur.nom} (${utilisateur.role}) ===`,
        choices: [
          new Separator(' '),
          new Separator('─── Menu Principal ───'),
          { name: '🛒 Rechercher un produit', value: 'recherche' },
          { name: '💰 Enregistrer une vente', value: 'vente' },
          { name: '↩️ Annuler une vente', value: 'annuler' },
          { name: '📦 Consulter le stock', value: 'stock' },
          { name: '📦 Réapprovisionnement depuis le centre logistique', value: 'reappro' },
          { name: '❌ Quitter', value: 'exit' },
          new Separator(' ')
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

        const { data: results } = await axios.get(`${API_URL}/magasins/${magasin.id}/produits`, {
          params: { nom }
        });

        console.log('\nRésultats :\n');
        if (!results || results.length === 0) {
          console.log('❌ Aucun produit trouvé.');
        } else {
          results.forEach(p =>
            console.log(`🔸 ${p.nom} (${p.Categorie?.nom || 'Sans catégorie'}) - $${p.prix} | Stock: ${p.stock}`)
          );
        }

        await pause();
        break;
      }
      case 'reappro': {
  console.clear();
  // On récupère le stock du centre logistique
  const { data: stock } = await axios.get(`${API_URL}/logistique/stock`);
  console.log('\nStock du centre logistique :');
  stock.forEach(s => {
    console.log(`- ${s.nom} : ${s.stock}`);
  });

  const { produitId, quantite } = await inquirer.prompt([
    {
      type: 'list',
      name: 'produitId',
      message: 'Quel produit réapprovisionner ?',
      choices: stock.map(s => ({
        name: `${s.nom} (Stock: ${s.stock})`,
        value: s.id
      }))
    },
    {
      type: 'number',
      name: 'quantite',
      message: 'Quantité à demander :',
      validate: q => q > 0 ? true : 'Quantité invalide'
    }
  ]);
  try {
    // Appel à la route de réapprovisionnement (qui crée la demande)
    await axios.post(`${API_URL}/logistique/magasins/${magasin.id}/reappro`, { produitId, quantite });
    console.log('✅ Demande envoyée.');
  } catch (e) {
    console.log('❌ ' + (e.response?.data?.error || e.message));
  }
  await pause();
  break;
}
      case 'annuler': {
        console.clear();

        const { data: ventes } = await axios.get(`${API_URL}/magasins/${magasin.id}/ventes`);

        if (!ventes || ventes.length === 0) {
          console.log('⚠️ Aucune vente à annuler.');
          await pause();
          break;
        }

        const { venteId } = await inquirer.prompt({
          type: 'list',
          name: 'venteId',
          message: '📄 Sélectionne une vente à annuler :',
          choices: ventes.map(v => ({
            name: `#${v.id} | ${new Date(v.date).toLocaleString()} | Total: $${v.total}`,
            value: v.id
          }))
        });

        try {
          await axios.post(`${API_URL}/magasins/${magasin.id}/ventes/${venteId}/annuler`);
          console.log('✅ Vente annulée avec succès.');
        } catch (e) {
          console.log('❌ ' + (e.response?.data?.error || e.message));
        }
        await pause();
        break;
      }

      case 'stock': {
        console.clear();
        const { data: produits } = await axios.get(`${API_URL}/magasins/${magasin.id}/stock`);
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
  const magasin = await selectionnerMagasin();
  const utilisateur = await selectionnerUtilisateur(magasin.id);
  await mainMenu(utilisateur, magasin);
}

start();