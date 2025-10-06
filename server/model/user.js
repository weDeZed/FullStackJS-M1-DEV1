
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Identifiant unique de l'utilisateur
 *         email:
 *           type: string
 *           description: Email de l'utilisateur
 *         name:
 *           type: string
 *           description: Nom de l'utilisateur
 *         phone:
 *           type: string
 *           description: Numéro de téléphone
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date de création
 */
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: false,
    unique: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("User", userSchema);
