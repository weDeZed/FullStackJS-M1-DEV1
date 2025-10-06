const express = require('express');
const userCrtl = require('../controller/userController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Récupère la liste des utilisateurs
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Utilisateurs
 *     responses:
 *       200:
 *         description: Liste des utilisateurs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: Non autorisé
 */
router.get('/users', requireAuth, userCrtl.getAllUsers);

module.exports = router;