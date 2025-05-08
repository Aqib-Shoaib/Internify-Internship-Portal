const mongoose = require("mongoose");

const User = require("../models/User");
const Intern = require("../models/Intern");
const Company = require("../models/Company");
const Admin = require("../models/Admin");

//controller for user related functions, excluding auth related functions

const getUser = async (req, res) => {
  try {
    let profile;
    if (req.user.userType === "INTERN") {
      profile = await Intern.findOne({ userId: req.user._id });
    } else if (req.user.userType === "COMPANY") {
      profile = await Company.findOne({ userId: req.user._id });
    } else if (req.user.userType === "ADMIN") {
      profile = await Admin.findOne({ userId: req.user._id });
    }

    res.json({
      user: {
        email: req.user.email,
        userType: req.user.userType,
        createdAt: req.user.createdAt,
      },
      profile,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const deleteUser = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const user = await User.findById(req.user.id).session(session);
    if (!user) throw new Error("User not found");

    // Delete type-specific profile
    if (user.userType === "INTERN") {
      await Intern.deleteOne({ userId: user._id }).session(session);
      // Delete related applications
      // await InternshipApplication.deleteMany({ internId: user._id }).session(
      //   session,
      // );
      // Delete related reviews
      // await Review.deleteMany({
      //   $or: [{ reviewerId: user._id }, { reviewedUserId: user._id }],
      // }).session(session);
    } else if (user.userType === "COMPANY") {
      await Company.deleteOne({ userId: user._id }).session(session);
      // Delete related internships and their applications
      // const internships = await Internship.find({
      //   companyId: user._id,
      // }).session(session);
      // const internshipIds = internships.map((internship) => internship._id);
      // await InternshipApplication.deleteMany({
      //   internshipId: { $in: internshipIds },
      // }).session(session);
      // await Internship.deleteMany({ companyId: user._id }).session(session);
      // // Delete related reviews
      // await Review.deleteMany({
      //   $or: [{ reviewerId: user._id }, { reviewedUserId: user._id }],
      // }).session(session);
    } else if (user.userType === "ADMIN") {
      await Admin.deleteOne({ userId: user._id }).session(session);
    }

    // Delete user
    await user.deleteOne({ session });

    await session.commitTransaction();
    res.json({ message: "User deleted" });
  } catch (error) {
    await session.abortTransaction();
    res.status(400).json({ error: error.message });
  } finally {
    session.endSession();
  }
};

const updateUser = async (req, res) => {
  const session = await mongoose.startSession();
  let updatedProfile = null;
  session.startTransaction();

  try {
    const { profile } = req.body;

    if (!profile && typeof profile !== "object")
      throw new Error("Profile data is required and must be an object");
    const user = await User.findById(req.user.id).session(session);
    if (!user) throw new Error("User not found");

    // Only update updatedAt timestamp
    user.updatedAt = Date.now();
    await user.save({ session });

    // Update type-specific profile
    if (user.userType === "INTERN") {
      const intern = await Intern.findOne({ userId: user._id }).session(
        session,
      );
      if (!intern) throw new Error("Intern profile not found");
      Object.assign(intern, profile);
      await intern.save({ session });
      updatedProfile = intern;
    } else if (user.userType === "COMPANY") {
      const company = await Company.findOne({ userId: user._id }).session(
        session,
      );
      if (!company) throw new Error("Company profile not found");
      Object.assign(company, profile);
      await company.save({ session });
      updatedProfile = company;
    }

    await session.commitTransaction();
    res
      .status(200)
      .json({ message: "User updated", updatedUser: { user, updatedProfile } });
  } catch (error) {
    await session.abortTransaction();
    res.status(400).json({ error: error.message });
  } finally {
    session.endSession();
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

const getAllInterns = async (req, res) => {
  try {
    const interns = await Intern.find({}).populate({
      path: "userId", // The field to populate
      select: "email", // Fields to return from the populated doc
    });
    res.status(200).json(interns);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find({}).populate({
      path: "userId", // The field to populate
      select: "email", // Fields to return from the populated doc
    });
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find({}).populate({
      path: "userId", // The field to populate
      select: "email", // Fields to return from the populated doc
    });
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getUser,
  deleteUser,
  updateUser,
  getAllUsers,
  getAllInterns,
  getAllCompanies,
  getAllAdmins,
};
