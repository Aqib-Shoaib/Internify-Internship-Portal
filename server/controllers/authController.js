const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("../models/User");
const Admin = require("../models/Admin");
const Intern = require("../models/Intern");
const Company = require("../models/Company");
const { createSendToken } = require("../utils/jwtHelpers");

//controller for auth related functions

const createAdmin = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { email, password, role } = req.body;

    // Check if email exists
    const existingUser = await User.findOne({ email }).session(session);
    if (existingUser) throw new Error("Email already in use");

    // Create User
    const user = new User({
      email,
      passwordHash: await bcrypt.hash(password, 10),
      userType: "ADMIN",
    });
    await user.save({ session });

    // Create Admin profile
    const admin = new Admin({
      userId: user._id,
      role,
    });
    await admin.save({ session });

    await session.commitTransaction();
    res.status(201).json({ message: "Admin created", user });
  } catch (error) {
    await session.abortTransaction();
    res.status(400).json({ error: error.message });
  } finally {
    session.endSession();
  }
};

const createUser = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { email, password, userType, profile } = req.body;

    // Validate userType
    if (!["INTERN", "COMPANY"].includes(userType)) {
      throw new Error("Invalid user type. Only INTERN or COMPANY allowed.");
    }

    // Check if email exists
    const existingUser = await User.findOne({ email }).session(session);
    if (existingUser) {
      throw new Error("Email already in use.");
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create User
    const user = new User({
      email,
      passwordHash,
      userType,
    });
    await user.save({ session });

    // Create type-specific profile
    if (userType === "INTERN") {
      const intern = new Intern({
        userId: user._id,
        firstName: profile.firstName,
        lastName: profile.lastName,
        resumeUrl: profile.resumeUrl,
        skills: profile.skills || [],
        education: profile.education,
      });
      await intern.save({ session });
    } else if (userType === "COMPANY") {
      const company = new Company({
        userId: user._id,
        companyName: profile.companyName,
        industry: profile.industry,
        location: profile.location,
        website: profile.website,
      });
      await company.save({ session });
    }

    await session.commitTransaction();
    createSendToken(user, 200, res);
  } catch (error) {
    await session.abortTransaction();
    res.status(400).json({ error: error.message });
  } finally {
    session.endSession();
  }
};

const updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res
        .status(400)
        .json({ error: "Old and new passwords are required" });
    }

    const user = await User.findById(req.user.id).select("+passwordHash");
    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(oldPassword, user.passwordHash);
    if (!isMatch)
      return res.status(401).json({ error: "Incorrect old password" });

    user.passwordHash = await bcrypt.hash(newPassword, 10);
    user.updatedAt = Date.now();
    await user.save();

    createSendToken(user, 200, res);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email or Password missing" });
    }

    //checking if email exists
    const user = await User.findOne({ email }).select("+passwordHash");

    //checking if there is a user with provided email and password
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(400).json({ error: "Invalid Email or Password" });
    }
    //sending the response if all guard clauses are passed
    createSendToken(user, 200, res);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports = { createAdmin, createUser, updatePassword, login };
