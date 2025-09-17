const mongoose = require('mongoose');

const db = async () => {
  try {
    await mongoose.connect(process.env.ATLAS_URI, {
    });
    console.log("MongoDB connecté");
  } catch (err) {
    console.error("Erreur connexion MongoDB:", err);
    process.exit(1);
  }
};

module.exports = db;