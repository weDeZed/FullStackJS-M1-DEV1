const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const contactController = require('../controller/contactController');
const router = express.Router();

/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Récupère tous les contacts de l'utilisateur connecté
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Contacts
 *     responses:
 *       200:
 *         description: Liste des contacts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contact'
 */
router.get('/contacts', requireAuth, contactController.getContacts);

/**
 * @swagger
 * /contacts:
 *   post:
 *     summary: Crée un contact
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Contacts
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       201:
 *         description: Contact créé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       400:
 *         description: Champs requis manquants
 */
router.post('/contacts', requireAuth, contactController.createContact);

/**
 * @swagger
 * /contacts/{id}:
 *   patch:
 *     summary: Met à jour partiellement un contact
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Contacts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Contact mis à jour
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       404:
 *         description: Contact non trouvé
 */
router.patch('/:id', requireAuth, contactController.updateContact);

/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     summary: Supprime un contact
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Contacts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contact supprimé
 *       404:
 *         description: Contact non trouvé
 */
router.delete('/:id', requireAuth, contactController.deleteContact);

module.exports = router;
