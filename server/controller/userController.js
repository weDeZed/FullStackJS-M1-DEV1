const User = require("../model/user");

exports.registerUser = async (req, res) => {
  try {
    const { name } = req.body;
    const newUser = new User({ name });
    await newUser.save();
    res.status(201).json({ message: "User crée" });
  } catch (error) {
    console.error("Erreur registerUser:", error.message);
    res.status(500).json({ error: "Erreur serveur" });
  }
};


