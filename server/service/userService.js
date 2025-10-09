const User = require('../model/user');

exports.createUser = async (data) => {
  const existingUser = await User.findOne({ email: data.email });
  if (existingUser) {
    throw new Error('email existe déja');
  }
  return await User.create(data);
};

exports.getUsers = async () => {
  return await User.find();
};

exports.getUserById = async (id) => {
  return await User.findById(id);
};

exports.updateUser = async (id, data) => {
  return await User.findByIdAndUpdate(id, data, { new: true });
};

exports.deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};

exports.getUserByEmail = async (email) => {
  return await User.findOne({ email });
};