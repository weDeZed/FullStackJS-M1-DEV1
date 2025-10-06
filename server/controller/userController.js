const User = require("../model/user");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    res.json(users);
  } catch (error) {
    console.error('Erreur getAllUsers:', error.message);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};


