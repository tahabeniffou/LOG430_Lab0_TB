/**
 * @openapi
 * /rapports:
 *   get:
 *     summary: Génère ou récupère des rapports
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [ventes, dashboard]
 *         required: true
 *         description: Type de rapport à générer
 *       - in: query
 *         name: start
 *         schema:
 *           type: string
 *           format: date
 *         description: Date de début (YYYY-MM-DD)
 *       - in: query
 *         name: end
 *         schema:
 *           type: string
 *           format: date
 *         description: Date de fin (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Rapport généré
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 oneOf:
 *                   - $ref: '#/components/schemas/RapportVentes'
 *                   - $ref: '#/components/schemas/RapportDashboard'
 */
import { Router } from 'express';
import rapportController from '../controllers/rapportController.js';

const router = Router();

// GET /api/v1/rapports?type=ventes
router.get('/', rapportController.generer);

// (optionnel) GET par ID de rapport
router.get('/:id', rapportController.recuperer);

export default router;
