const User = require("../model/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userService = require('../service/userService');


exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    res.json(users);
  } catch (error) {
    console.error('erreur getAllUsers:', error.message);
    res.status(500).json({ error: 'erreur serveur' });
  }
};

exports.register = async (req, res) => {
    try {
      const { email, password, name, phone } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: 'il faut un mail et un mdp' });
      }
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'l email est déjà utilisé' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ email, password: hashedPassword, name, phone });
      await user.save();
      const userObj = user.toObject();
      delete userObj.password;
      res.status(201).json(userObj);
    } catch (err) {
      console.error('Erreur /auth/register:', err);
      res.status(500).json({ message: 'erreur serveur' });
    }
  };

  exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: 'email et mot de passe requis' });
      }
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Identifiants pas valides' });
      }
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        return res.status(401).json({ message: 'Identifiants pas valides' });
      }
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } catch (err) {
      console.error('Erreur /auth/login:', err);
      res.status(500).json({ message: 'erreur serveur.' });
    }
  };

  exports.createUser = async (req, res) => {
    try {
      const user = await userService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      if (error.message === 'Email already exists') {
        return res.status(400).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  };

  exports.getUsers = async (req, res) => {
    try {
      const users = await userService.getUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  exports.getUserById = async (req, res) => {
    try {
      const user = await userService.getUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'user existe pas' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  exports.updateUser = async (req, res) => {
    try {
      const user = await userService.updateUser(req.params.id, req.body);
      if (!user) {
        return res.status(404).json({ message: 'user existe pas' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  exports.deleteUser = async (req, res) => {
    try {
      const user = await userService.deleteUser(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'user existe pas' });
      }
      res.json({ message: 'user existe pas' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  exports.getUserByEmail = async (req, res) => {
    try {
      const user = await userService.getUserByEmail(req.body.email);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


