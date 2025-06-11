
/**
 * @openapi
 * /produits:
 *   get:
 *     summary: Récupère la liste des produits
 *     parameters:
 *       - in: query
 *         name: magasinId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du magasin
 *       - in: query
 *         name: nom
 *         schema:
 *           type: string
 *         description: Filtre par nom de produit (partiel)
 *     responses:
 *       200:
 *         description: Liste des produits
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Produit'
 */
import { Router } from 'express';
import produitController from '../controllers/produitController.js';

const router = Router();

router
  .get('/',      produitController.lister)
  .get('/:id',   produitController.recuperer)
  .post('/',     produitController.creer)
  .put('/:id',   produitController.mettreAJour)
  .delete('/:id',produitController.supprimer);

export default router;
