
const inquirer   = require('inquirer');
const { Separator } = require('inquirer');
const axios      = require('axios');

const API_URL = 'http://localhost:3000/api/v1';

// 🔒 Sélection de la succursale (magasin)
async function selectionnerMagasin() {
  const { data: magasins } = await axios.get(`${API_URL}/magasins`);
  if (!magasins || magasins.length === 0) {
    console.log("❌ Aucun magasin trouvé. Lance d'abord le seed.");
    process.exit(1);
  }
  const { magasinId } = await inquirer.prompt([{
    type: 'list',
    name: 'magasinId',
    message: '🏬 Dans quelle succursale êtes-vous ?',
    choices: magasins.map(m => ({
      name: `${m.nom} (${m.adresse})`,
      value: m.id
    }))
  }]);
  return magasins.find(m => m.id === magasinId);
}

// 🔒 Sélection de l’utilisateur actif pour un magasin donné
async function selectionnerUtilisateur(magasinId) {
  const { data: utilisateurs } = await axios.get(
    `${API_URL}/magasins/${magasinId}/utilisateurs`
  );
  if (!utilisateurs || utilisateurs.length === 0) {
    console.log("❌ Aucun utilisateur trouvé pour cette succursale.");
    process.exit(1);
  }
  const { utilisateurId } = await inquirer.prompt([{
    type: 'list',
    name: 'utilisateurId',
    message: '👤 Qui est connecté ?',
    choices: utilisateurs.map(u => ({
      name: `${u.nom} (${u.role})`,
      value: u.id
    }))
  }]);
  return utilisateurs.find(u => u.id === utilisateurId);
}

// 🧭 Menu principal
async function mainMenu(utilisateur, magasin) {
  while (true) {
    console.clear();
    const { action } = await inquirer.prompt([{
      type: 'list',
      name: 'action',
      message: `=== 💼 POS — ${magasin.nom} — Connecté : ${utilisateur.nom} (${utilisateur.role}) ===`,
      choices: [
        new Separator('─── Menu Principal ───'),
        { name: '🛒 Rechercher un produit',      value: 'recherche' },
        { name: '💰 Enregistrer une vente',      value: 'vente'     },
        { name: '↩️ Annuler une vente',         value: 'annuler'   },
        { name: '📦 Consulter le stock',         value: 'stock'     },
        { name: '📦 Réapprovisionner (logistique)', value: 'reappro'  },
        { name: '❌ Quitter',                   value: 'exit'      }
      ]
    }]);

    switch (action) {
      case 'recherche': {
        console.clear();
        const { nom } = await inquirer.prompt({
          type: 'input',
          name: 'nom',
          message: '🔎 Entrez le nom du produit à rechercher :'
        });
        const { data: results } = await axios.get(
          `${API_URL}/produits`,
          { params: { magasinId: magasin.id, nom } }
        );
        console.log('\nRésultats :\n');
        if (!results.length) {
          console.log('❌ Aucun produit trouvé.');
        } else {
          results.forEach(p =>
            console.log(`🔸 ${p.nom} (${p.categorie?.nom || 'Sans catégorie'}) – $${p.prix} | Stock: ${p.stock}`)
          );
        }
        await pause();
        break;
      }

      case 'vente': {
        console.clear();
        // 1) Récupère la liste des produits
        const { data: produits } = await axios.get(
          `${API_URL}/produits`,
          { params: { magasinId: magasin.id } }
        );
        if (!produits.length) {
          console.log('❌ Aucun produit disponible.');
          await pause();
          break;
        }
        // 2) Sélection des produits
        const { selection } = await inquirer.prompt([{
          type: 'checkbox',
          name: 'selection',
          message: '🛒 Sélectionne les produits à vendre :',
          choices: produits.map(p => ({
            name: `${p.nom} ($${p.prix} | Stock: ${p.stock})`,
            value: p.id,
            disabled: p.stock === 0 ? 'Rupture de stock' : false
          }))
        }]);
        if (!selection.length) {
          console.log('⚠️ Aucun produit sélectionné.');
          await pause();
          break;
        }
        // 3) Saisie des quantités
        const lignes = [];
        for (const id of selection) {
          const prod = produits.find(p => p.id === id);
          const { quantite } = await inquirer.prompt([{
            type: 'number',
            name: 'quantite',
            message: `Quantité pour ${prod.nom} (max ${prod.stock}) :`,
            validate: q => (q > 0 && q <= prod.stock) ? true : `Max = ${prod.stock}`
          }]);
          lignes.push({ produitId: id, quantite });
        }
        // 4) Envoi à l'API
        try {
          await axios.post(`${API_URL}/ventes`, {
            magasinId: magasin.id,
            utilisateurId: utilisateur.id,
            lignes
          });
          console.log('✅ Vente enregistrée avec succès.');
        } catch (e) {
          console.log('❌ ' + (e.response?.data?.message || e.message));
        }
        await pause();
        break;
      }

      case 'annuler': {
        console.clear();
        const { data: ventes } = await axios.get(
          `${API_URL}/ventes`,
          { params: { magasinId: magasin.id } }
        );
        if (!ventes.length) {
          console.log('⚠️ Aucune vente à annuler.');
          await pause();
          break;
        }
        const { venteId } = await inquirer.prompt([{
          type: 'list',
          name: 'venteId',
          message: '📄 Sélectionne une vente à annuler :',
          choices: ventes.map(v => ({
            name: `#${v.id} | ${new Date(v.date).toLocaleString()} | Total: $${v.total}`,
            value: v.id
          }))
        }]);
        try {
          await axios.post(`${API_URL}/ventes/${venteId}/annuler`);
          console.log('✅ Vente annulée.');
        } catch (e) {
          console.log('❌ ' + (e.response?.data?.message || e.message));
        }
        await pause();
        break;
      }

      case 'stock': {
        console.clear();
        const { data: stock } = await axios.get(
          `${API_URL}/stock`,
          { params: { magasinId: magasin.id } }
        );
        console.log('\n📦 État du stock :\n');
        stock.forEach(p =>
          console.log(`- ${p.nom} (${p.categorie?.nom || 'Sans catégorie'}) – Stock: ${p.stock}`)
        );
        await pause();
        break;
      }

      case 'reappro': {
        console.clear();
        const { data: centre } = await axios.get(`${API_URL}/logistique/stock`);
        console.log('\n📦 Stock du centre logistique :\n');
        centre.forEach(c =>
          console.log(`- ${c.nom} : ${c.stock}`)
        );
        const { produitId, quantite } = await inquirer.prompt([
          {
            type: 'list',
            name: 'produitId',
            message: 'Quel produit réapprovisionner ?',
            choices: centre.map(c => ({
              name: `${c.nom} (Stock: ${c.stock})`,
              value: c.id
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
          await axios.post(`${API_URL}/logistique/reappro`, {
            magasinId: magasin.id,
            produitId,
            quantite
          });
          console.log('✅ Demande envoyée.');
        } catch (e) {
          console.log('❌ ' + (e.response?.data?.message || e.message));
        }
        await pause();
        break;
      }

      case 'exit':
        console.clear();
        console.log('👋 À bientôt !');
        process.exit(0);
    }
  }
}

// 🔁 Pause pour lisibilité
async function pause() {
  await inquirer.prompt({
    type: 'input',
    name: 'pause',
    message: '\nAppuie sur [Entrée] pour continuer...'
  });
}

// 🚀 Point d’entrée
(async () => {
  console.clear();
  const magasin     = await selectionnerMagasin();
  const utilisateur = await selectionnerUtilisateur(magasin.id);
  await mainMenu(utilisateur, magasin);
})();
