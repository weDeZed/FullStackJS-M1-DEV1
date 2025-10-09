const contactService = require('../service/contactService');

exports.createContact = async (req, res) => {
  try {
    const contact = await contactService.createContact(req.user.userId, req.body);
    res.status(201).json(contact);
  } catch (error) {
    if (error.message === 'le contact existe déja') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

exports.getContacts = async (req, res) => {
  try {
    const contacts = await contactService.getContacts(req.user.userId);
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateContact = async (req, res) => {
  try {
    const contact = await contactService.updateContact(req.user.userId, req.params.id, req.body);
    if (!contact) {
      return res.status(404).json({ message: 'le contact existe déja' });
    }
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const contact = await contactService.deleteContact(req.user.userId, req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'le contact existe déja' });
    }
    res.json({ message: 'contact supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};