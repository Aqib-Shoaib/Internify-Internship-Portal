const User = require('../models/User');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: 'success',
      results: users.length,
      data: users,
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found.' });

    res.status(200).json({ status: 'success', data: user });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

const deleteMe = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndUpdate(
      req.user.id,
      { isActive: false },
      { new: true },
    );

    if (!deletedUser)
      return res.status(404).json({ message: 'User not found.' });

    res.status(204).json({ status: 'success', data: null });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const fieldsToUpdate = { ...req.body };
    delete fieldsToUpdate.password;
    delete fieldsToUpdate.role;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      fieldsToUpdate,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedUser)
      return res.status(404).json({ message: 'User not found.' });

    res.status(200).json({
      status: 'success',
      data: updatedUser,
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true },
    );

    if (!deletedUser)
      return res.status(404).json({ message: 'User not found.' });

    res.status(204).json({ status: 'success', data: null });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};
const verifyCompany = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user || user.role !== 'COMPANY')
      return res.status(404).json({ message: 'Company not found.' });

    user.company.isVerified = true;
    await user.save();

    res.status(200).json({
      status: 'success',
      message: 'Company verified successfully.',
      data: user,
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) throw new Error('User not found');
    if (user.isActive === false) throw new Error('User is not active');
    res.status(200).json({ status: 'success', data: user });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

const updateMe = async (req, res) => {
  try {
    const fieldsToUpdate = { ...req.body };
    delete fieldsToUpdate.password;
    delete fieldsToUpdate.role;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      fieldsToUpdate,
      {
        new: true,
        runValidators: true,
      },
    );

    res.status(200).json({
      status: 'success',
      data: updatedUser,
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

const createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const newUser = await User.create({
      name,
      email,
      password,
      role: 'ADMIN',
    });

    res.status(201).json({
      status: 'success',
      data: newUser,
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

module.exports = {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  verifyCompany,
  getMe,
  updateMe,
  deleteMe,
  createAdmin,
};
