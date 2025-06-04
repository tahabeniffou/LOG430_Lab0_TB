const express = require('express');
const router = express.Router({ mergeParams: true });
const { afficherStockLogistique, reapprovisionnerMagasin } = require('../../controllers/logistiqueController');

// GET /logistique/stock
router.get('/stock', async (req, res) => {
  try {
    const stock = await afficherStockLogistique();
    res.json(stock);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// POST /magasins/:magasinId/reappro
router.post('/magasins/:magasinId/reappro', async (req, res) => {
  try {
    const { produitId, quantite } = req.body;
    await reapprovisionnerMagasin(produitId, req.params.magasinId, quantite);
    res.json({ message: 'Réapprovisionnement effectué' });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

module.exports = router;