const Produit = require('../models/Produit');
const Magasin = require('../models/Magasin');
const Vente = require('../models/Vente');
const LigneVente = require('../models/LigneVente');
const Utilisateur = require('../models/Utilisateur');
const Categorie = require('../models/Categorie');
const { Op, fn, col } = require('sequelize');

// UC1 – Générer un rapport consolidé des ventes
async function genererRapport(apiMode = false) {
  const magasins = await Magasin.findAll();
  const rapport = [];

  for (const magasin of magasins) {
    const ventes = await Vente.findAll({ where: { magasinId: magasin.id } });
    const totalVentes = ventes.reduce((acc, v) => acc + (v.total || 0), 0);

    // Produits les plus vendus
    const lignes = await LigneVente.findAll({
      include: [
        { model: Produit },
        { model: Vente, where: { magasinId: magasin.id } }
      ]
    });
    const produitsVendus = {};
    lignes.forEach(lv => {
      const nom = lv.Produit?.nom || 'Inconnu';
      produitsVendus[nom] = (produitsVendus[nom] || 0) + lv.quantite;
    });
    const topProduits = Object.entries(produitsVendus)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);

    // Stock restant
    const produits = await Produit.findAll({ where: { magasinId: magasin.id } });

    rapport.push({
      magasin: { nom: magasin.nom, adresse: magasin.adresse },
      chiffreAffaires: totalVentes,
      topProduits: topProduits.map(([nom, qte]) => ({ nom, quantite: qte })),
      stock: produits.map(p => ({ nom: p.nom, stock: p.stock }))
    });
  }

  if (apiMode) return rapport;

  // Sinon, affichage console
  console.clear();
  console.log('=== Rapport consolidé des ventes et stocks ===\n');
  rapport.forEach(r => {
    console.log(`\n🏬 ${r.magasin.nom} (${r.magasin.adresse})`);
    console.log(`  - Chiffre d'affaires: $${r.chiffreAffaires.toFixed(2)}`);
    console.log(`  - Top produits:`);
    r.topProduits.forEach(tp => {
      console.log(`      ${tp.nom}: ${tp.quantite} vendus`);
    });
    console.log(`  - Stock restant:`);
    r.stock.forEach(s => {
      console.log(`      ${s.nom}: ${s.stock}`);
    });
  });
  await pause();
}

// UC3 – Visualiser les performances des magasins dans un tableau de bord (avec tendance hebdomadaire)
async function afficherDashboard(apiMode = false) {
  const magasins = await Magasin.findAll();
  const dashboard = [];

  for (const magasin of magasins) {
    const ventes = await Vente.findAll({ where: { magasinId: magasin.id } });
    const totalVentes = ventes.reduce((acc, v) => acc + (v.total || 0), 0);

    const produits = await Produit.findAll({ where: { magasinId: magasin.id } });
    const ruptures = produits.filter(p => p.stock <= 5);
    const surstocks = produits.filter(p => p.stock >= 100);

    // Tendance hebdomadaire (7 derniers jours, groupé par jour)
    const ventesHebdo = await Vente.findAll({
      where: {
        magasinId: magasin.id,
        date: {
          [Op.gte]: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        }
      },
      attributes: [
        [fn('DATE_TRUNC', 'day', col('date')), 'jour'],
        [fn('SUM', col('total')), 'totalJour']
      ],
      group: [fn('DATE_TRUNC', 'day', col('date'))],
      order: [[fn('DATE_TRUNC', 'day', col('date')), 'ASC']]
    });

    dashboard.push({
      magasin: { nom: magasin.nom, adresse: magasin.adresse },
      chiffreAffaires: totalVentes,
      ruptures: ruptures.map(p => p.nom),
      surstocks: surstocks.map(p => p.nom),
      tendance: ventesHebdo.map(v => ({
        jour: v.get('jour').toISOString().slice(0, 10),
        total: parseFloat(v.get('totalJour'))
      }))
    });
  }

  if (apiMode) return dashboard;

  // Sinon, affichage console
  console.clear();
  console.log('=== Tableau de bord synthétique ===\n');
  dashboard.forEach(d => {
    console.log(`🏬 ${d.magasin.nom}`);
    console.log(`  - Chiffre d'affaires: $${d.chiffreAffaires.toFixed(2)}`);

    if (d.ruptures.length)
      console.log(`  - ⚠️ Ruptures de stock: ${d.ruptures.join(', ')}`);
    else
      console.log(`  - ✅ Aucune rupture de stock, tout va bien`);

    if (d.surstocks.length)
      console.log(`  - 📦 Surstocks: ${d.surstocks.join(', ')}`);
    else
      console.log(`  - Aucun surstock`);

    if (d.tendance.length) {
      console.log('  - Tendance hebdomadaire :');
      d.tendance.forEach(t => {
        console.log(`      ${t.jour} : $${t.total.toFixed(2)}`);
      });
    } else {
      console.log('  - Aucune tendance disponible');
    }
    console.log();
  });
  await pause();
}

module.exports = { genererRapport, afficherDashboard };