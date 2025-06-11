
import express from 'express';
import produitRoutes from './routes/produit.js';
import venteRoutes   from './routes/vente.js';
import rapportRoutes from './routes/rapport.js';
import userRoutes    from './routes/utilisateur.js';

 const router = express.Router();

router.use('/produits',     produitRoutes);
router.use('/ventes',       venteRoutes);
router.use('/rapports',     rapportRoutes);
router.use('/utilisateurs', userRoutes);

 export default router;
