const Contact = require('../model/contact');

exports.createContact = async (userId, data) => {
  const existingContact = await Contact.findOne({
    user: userId,
    firstName: data.firstName,
    lastName: data.lastName,
    phone: data.phone
  });
  if (existingContact) {
    throw new Error('le contact existe déja');
  }
  return await Contact.create({ ...data, user: userId });
};

exports.getContacts = async (userId) => {
  return await Contact.find({ user: userId });
};

exports.updateContact = async (userId, contactId, data) => {
  return await Contact.findOneAndUpdate(
    { _id: contactId, user: userId },
    { $set: data },
    { new: true }
  );
};

exports.deleteContact = async (userId, contactId) => {
  return await Contact.findOneAndDelete({ _id: contactId, user: userId });
};