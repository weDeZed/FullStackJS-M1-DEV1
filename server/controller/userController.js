const User = require("../model/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    res.json(users);
  } catch (error) {
    console.error('Erreur getAllUsers:', error.message);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

  exports.register = async (req, res) => {
    try {
      const { email, password, name, phone } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: 'Email et mot de passe requis.' });
      }
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ email, password: hashedPassword, name, phone });
      await user.save();
      const userObj = user.toObject();
      delete userObj.password;
      res.status(201).json(userObj);
    } catch (err) {
      console.error('Erreur /auth/register:', err);
      res.status(500).json({ message: 'Erreur serveur.' });
    }
  };

  exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: 'Email et mot de passe requis.' });
      }
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Identifiants invalides.' });
      }
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        return res.status(401).json({ message: 'Identifiants invalides.' });
      }
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } catch (err) {
      console.error('Erreur /auth/login:', err);
      res.status(500).json({ message: 'Erreur serveur.' });
    }
  };


