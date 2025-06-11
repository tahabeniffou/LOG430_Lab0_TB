import express from 'express';
import produitRoutes from '../routes/produit.js';
import venteRoutes   from '../routes/vente.js';
import rapportRoutes from '../routes/rapport.js';
import userRoutes    from '../routes/utilisateur.js';

const router = express.Router();

// versioning v1
router.use('/v1/produits',      produitRoutes);
router.use('/v1/ventes',        venteRoutes);
router.use('/v1/rapports',      rapportRoutes);
router.use('/v1/utilisateurs',  userRoutes);

export default router;
