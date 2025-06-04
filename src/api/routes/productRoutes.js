const express = require('express');
const router = express.Router({ mergeParams: true });
const { rechercherProduitParNom } = require('../../controllers/productController');

// GET /magasins/:magasinId/produits?nom=...
router.get('/', async (req, res) => {
  try {
    const produits = await rechercherProduitParNom(req.query.nom, req.params.magasinId);
    res.json(produits);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;