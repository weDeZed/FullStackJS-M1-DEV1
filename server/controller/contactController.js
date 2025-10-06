const Contact = require('../model/contact');

exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.userId });
    res.json(contacts);
  } catch (err) {
    console.error('Erreur getContacts:', err);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

exports.createContact = async (req, res) => {
  try {
    const { firstName, lastName, phone} = req.body;
    if (!firstName || !lastName || !phone) {
      return res.status(400).json({ message: 'Champs requis manquants.' });
    }

    const actualUserId = req.user.userId;
    const contact = new Contact({ firstName, lastName, phone, user: actualUserId});

    console.log(contact);

    await contact.save();
    res.status(201).json(contact);


  } catch (err) {
    console.error('Erreur createContact:', err);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

exports.updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;
    const contact = await Contact.findOneAndUpdate(
      { _id: id, user: req.userId },
      update,
      { new: true }
    );
    if (!contact) {
      return res.status(404).json({ message: 'Contact non trouvé.' });
    }
    res.json(contact);
  } catch (err) {
    console.error('Erreur updateContact:', err);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findOneAndDelete({ _id: id, user: req.userId });
    if (!contact) {
      return res.status(404).json({ message: 'Contact non trouvé.' });
    }
    res.json({ message: 'Contact supprimé.' });
  } catch (err) {
    console.error('Erreur deleteContact:', err);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};
