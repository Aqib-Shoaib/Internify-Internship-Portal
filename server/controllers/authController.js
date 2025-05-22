const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const axios = require('axios');

const User = require('../models/User');
const { createSendToken } = require('../utils/jwtHelpers');
const {
  sendWelcome,
  sendForgotPasswordEmail,
  sendOtpEmail,
} = require('../utils/emails');
const { generateOTP } = require('../utils/general');

const register = async (req, res) => {
  const { name, email, password, role, website, phoneNumber } = req.body;
  const otp = generateOTP();
  const otpExpires = Date.now() + 5 * 60 * 1000;
  try {
    if (!name || !email || !password || !role)
      throw new Error('Please provide all required fields.');

    if (role !== 'INTERN' && role !== 'COMPANY')
      throw new Error('Role must be either INTERN or COMPANY.');
    const userObj = {
      name,
      email,
      password,
      role,
      otp,
      otpExpires,
      website,
      phoneNumber,
    };
    if (role === 'INTERN') {
      userObj.skills = req.body.skills || [];
      userObj.education = req.body.education || [];
      userObj.resume = req.body.resume || '';
    } else if (role === 'COMPANY') {
      userObj.industry = req.body.industry || '';
      userObj.location = req.body.location || '';
    }

    const newUser = await User.create(userObj);

    await sendOtpEmail(email, otp);

    res.status(201).json({
      status: 'success',
      message: 'OTP sent to email. Please verify to complete signup.',
      userEmail: newUser.email,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};
const registerWithGoogle = async (req, res) => {
  try {
    const { tokenResponse, name, email, role, website, phoneNumber } = req.body;

    const response = await axios.get(
      'https://www.googleapis.com/oauth2/v3/userinfo',
      {
        headers: {
          Authorization: `Bearer ${tokenResponse.access_token}`,
        },
      },
    );
    const { sub } = response.data;
    const user = await User.findOne({ googleSubId: sub });

    if (user) {
      return res
        .status(400)
        .json({ message: 'User with this Gmail already exists.' });
    }
    const otp = generateOTP();
    const otpExpires = Date.now() + 5 * 60 * 1000;

    if (role !== 'INTERN' && role !== 'COMPANY')
      throw new Error('Role must be either INTERN or COMPANY.');
    const userObj = {
      name,
      email,
      role,
      googleSubId: sub,
      otp,
      otpExpires,
      website,
      phoneNumber,
    };
    if (role === 'INTERN') {
      userObj.skills = req.body.skills || [];
      userObj.education = req.body.education || [];
      userObj.resume = req.body.resume || '';
    } else if (role === 'COMPANY') {
      userObj.industry = req.body.industry || '';
      userObj.location = req.body.location || '';
    }

    const newUser = await User.create(userObj);

    await sendOtpEmail(email, otp);

    res.status(201).json({
      status: 'success',
      message: 'OTP sent to email. Please verify to complete signup.',
      userEmail: newUser.email,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

const loginWithGoogle = async (req, res) => {
  try {
    const { tokenResponse } = req.body;

    const response = await axios.get(
      'https://www.googleapis.com/oauth2/v3/userinfo',
      {
        headers: {
          Authorization: `Bearer ${tokenResponse.access_token}`,
        },
      },
    );
    const { sub } = response.data;
    const user = await User.findOne({ googleSubId: sub });

    if (!user) {
      return res
        .status(400)
        .json({ message: 'No User with this Gmail Found.' });
    }
    createSendToken(user, 200, res);
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ message: 'Please provide email and password.' });

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(401).json({ message: 'Incorrect email or password.' });

    createSendToken(user, 200, res);
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  try {
    if (!user)
      return res
        .status(404)
        .json({ message: 'No user found with that email.' });

    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    user.passwordResetToken = hashedToken;
    user.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 mins
    await user.save({ validateBeforeSave: false });

    await sendForgotPasswordEmail(email, resetToken);

    res
      .status(200)
      .json({ status: 'success', message: 'Token sent to email!' });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordTokenExpiresAt = undefined;
    await user.save({ validateBeforeSave: false });
    res.status(500).json({ status: 'error', message: err.message });
  }
};

const resetPassword = async (req, res) => {
  const { password, token } = req.body;
  try {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user)
      return res
        .status(400)
        .json({ message: 'Token is invalid or has expired.' });

    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    res.status(200).json({
      status: 'success',
      message: 'Password has been reset, please log in again',
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

const updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('+password');

    if (!(await bcrypt.compare(req.body.currentPassword, user.password)))
      return res
        .status(401)
        .json({ message: 'Your current password is incorrect.' });

    user.password = req.body.newPassword;
    await user.save();

    createSendToken(user, 200, res);
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });

  if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
    await User.deleteOne({ _id: user._id });
    throw new Error('Invalid or expired OTP');
  }

  user.allowLogin = true;
  user.otp = undefined;
  user.otpExpires = undefined;
  await user.save();
  await sendWelcome(user.name, email);
  createSendToken(user, 200, res);
};

module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
  verifyOtp,
  loginWithGoogle,
  registerWithGoogle,
};
