const express = require('express');
const router = express.Router({ mergeParams: true });
const { enregistrerVente, annulerVente } = require('../../controllers/salesController');
const Vente = require('../../models/Vente');
const Paiement = require('../../models/Paiement');
const LigneVente = require('../../models/LigneVente');
const Produit = require('../../models/Produit');

// POST /magasins/:magasinId/ventes
router.post('/', async (req, res) => {
  try {
    const { produits, utilisateurId } = req.body; // Correction ici
    await enregistrerVente(produits, utilisateurId, req.params.magasinId);
    res.json({ message: 'Vente enregistrée' });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// POST /magasins/:magasinId/ventes/:venteId/annuler
router.post('/:venteId/annuler', async (req, res) => {
  try {
    await annulerVente(req.params.venteId, req.params.magasinId);
    res.json({ message: 'Vente annulée' });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// GET /magasins/:magasinId/ventes
router.get('/', async (req, res) => {
  try {
    const ventes = await Vente.findAll({
      where: { magasinId: req.params.magasinId },
      order: [['date', 'DESC']],
      include: [
        { model: Paiement },
        { model: LigneVente, include: [Produit] }
      ]
    });
    res.json(ventes);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;