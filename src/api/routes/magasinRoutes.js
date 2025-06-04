const express = require('express');
const router = express.Router();
const Utilisateur = require('../../models/Utilisateur');

// GET /magasins/:id/utilisateurs
router.get('/:id/utilisateurs', async (req, res) => {
  try {
    const utilisateurs = await Utilisateur.findAll({ where: { magasinId: req.params.id } });
    res.json(utilisateurs);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;