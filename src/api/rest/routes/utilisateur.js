/**
 * @openapi
 * /utilisateurs:
 *   get:
 *     summary: Récupère la liste des utilisateurs
 *     parameters:
 *       - in: query
 *         name: magasinId
 *         schema:
 *           type: integer
 *         description: ID du magasin pour filtrer les utilisateurs
 *     responses:
 *       200:
 *         description: Liste des utilisateurs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Utilisateur'
 */
import { Router } from 'express';
import utilisateurController from '../controllers/utilisateurController.js';

const router = Router();

router
  .get('/',      utilisateurController.lister)
  .get('/:id',   utilisateurController.recuperer)
  .post('/',     utilisateurController.creer)
  .put('/:id',   utilisateurController.mettreAJour)
  .delete('/:id',utilisateurController.supprimer);

export default router;
