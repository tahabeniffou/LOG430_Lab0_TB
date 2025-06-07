const express = require('express');
const router = express.Router();
const { genererRapport, afficherDashboard, tendanceHebdo } = require('../../controllers/maisonMereController');
const Magasin = require('../../models/Magasin');

// GET /maison-mere/rapport
router.get('/rapport', async (req, res) => {
  try {
    const rapport = await genererRapport(true);
    res.json(rapport);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET /maison-mere/dashboard
router.get('/dashboard', async (req, res) => {
  try {
    const dashboard = await afficherDashboard(true);
    res.json(dashboard);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET /maison-mere/magasins
router.get('/magasins', async (req, res) => {
  try {
    const magasins = await Magasin.findAll({ attributes: ['id', 'nom', 'adresse'] });
    res.json(magasins);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;