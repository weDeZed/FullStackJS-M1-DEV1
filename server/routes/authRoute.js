
const express = require('express');
const userController = require('../controller/userController');
const router = express.Router();
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Crée un nouvel utilisateur
 *     tags:
 *       - Authentification
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@email.com
 *               password:
 *                 type: string
 *                 example: motdepasse
 *               name:
 *                 type: string
 *                 example: Jean Dupont
 *               phone:
 *                 type: string
 *                 example: '0601020304'
 *     responses:
 *       201:
 *         description: Utilisateur créé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Données manquantes ou utilisateur déjà existant
 *       500:
 *         description: Erreur serveur
 */
router.post('/register', userController.register);
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Authentifie un utilisateur et retourne un token JWT
 *     tags:
 *       - Authentification
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@email.com
 *               password:
 *                 type: string
 *                 example: motdepasse
 *     responses:
 *       200:
 *         description: Authentification réussie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       400:
 *         description: Email et mot de passe requis
 *       401:
 *         description: Identifiants invalides
 *       500:
 *         description: Erreur serveur
 */
router.post('/login', userController.login);

module.exports = router;
