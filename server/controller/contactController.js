const Contact = require('../model/contact');

exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.userId });
    res.json(contacts);
  } catch (err) {
    console.error('Erreur getContacts:', err);
    res.status(500).json({ message: 'erreur serveur' });
  }
};

exports.createContact = async (req, res) => {
  try {
    const { firstName, lastName, phone} = req.body;
    if (!firstName || !lastName || !phone) {
      return res.status(400).json({ message: 'Champs manquants' });
    }

    const actualUserId = req.user.userId;
    const contact = new Contact({ firstName, lastName, phone, user: actualUserId});

    console.log(contact);

    await contact.save();
    res.status(201).json(contact);


  } catch (err) {
    console.error('Erreur createContact:', err);
    res.status(500).json({ message: 'erreur serveur' });
  }
};

exports.updateContact = async (req, res) => {
  try {
    const contactId = req.params.id;
    const userId = req.user.userId;
    const { firstName, lastName, phone } = req.body;

    const updateFields = {};
    if (firstName !== undefined) updateFields.firstName = firstName;
    if (lastName !== undefined) updateFields.lastName = lastName;
    if (phone !== undefined) updateFields.phone = phone;

    const contact = await Contact.findOneAndUpdate(
      { _id: contactId, user: userId },
      { $set: updateFields },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({ message: 'Contact non trouvé' });
    }
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findOneAndDelete({ _id: id, user: req.user.userId });
    if (!contact) {
      return res.status(404).json({ message: 'contact non trouvé' });
    }
    res.json({ message: 'contact supprimé' });
  } catch (err) {
    console.error('Erreur deleteContact:', err);
    res.status(500).json({ message: 'erreur serveur' });
  }
};
