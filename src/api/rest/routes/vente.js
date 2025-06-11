/**
 * @openapi
 * /ventes:
 *   get:
 *     summary: Récupère la liste des ventes
 *     parameters:
 *       - in: query
 *         name: magasinId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du magasin
 *     responses:
 *       200:
 *         description: Liste des ventes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vente'
 */
import { Router } from 'express';
import venteController from '../controllers/venteController.js';

const router = Router();

router
  .get('/',      venteController.lister)
  .get('/:id',   venteController.recuperer)
  .post('/',     venteController.creer)
  .put('/:id',   venteController.mettreAJour)
  .delete('/:id',venteController.supprimer);

export default router;
