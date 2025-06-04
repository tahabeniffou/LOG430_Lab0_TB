const express = require('express');
const router = express.Router({ mergeParams: true });
const Produit = require('../../models/Produit');

// GET /magasins/:magasinId/produits
router.get('/', async (req, res) => {
  const { nom } = req.query;
  const where = { magasinId: req.params.magasinId };
  if (nom !== undefined && nom !== '') {
    where.nom = nom;
  }
  try {
    const produits = await Produit.findAll({ where });
    res.json(produits);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;