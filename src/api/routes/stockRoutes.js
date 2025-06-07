const express = require('express');
const router = express.Router({ mergeParams: true });
const Produit = require('../../models/Produit');
const Categorie = require('../../models/Categorie');

// GET /magasins/:magasinId/stock
router.get('/', async (req, res) => {
  try {
    const produits = await Produit.findAll({
      where: { magasinId: req.params.magasinId },
      include: Categorie
    });
    res.json(produits);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;