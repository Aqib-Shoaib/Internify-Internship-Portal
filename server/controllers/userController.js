// controllers/userController.js
const fs = require('fs').promises;
const path = require('path');
const User = require('../models/User');
const Internship = require('../models/Internship');
const Application = require('../models/InternshipApplication');

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

    user.verified = true;
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

const uploadProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: 'fail',
        message: 'No file uploaded',
      });
    }

    // Step 3: Get role to determine the image folder (from multer config)
    const folder = req.user.role === 'COMPANY' ? 'companies' : 'users';

    // Step 4: Format path for frontend (exclude 'public')
    const imageUrl = `/img/${folder}/${req.file.filename}`;

    // Step 5: Update user in DB
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { profileImage: imageUrl },
      { new: true, runValidators: false },
    );

    if (!updatedUser) {
      return res.status(404).json({
        status: 'fail',
        message: 'User not found',
      });
    }

    // Step 6: Respond with success
    res.status(200).json({
      status: 'success',
      message: 'Image uploaded successfully',
      data: {
        user: updatedUser,
      },
    });
  } catch (err) {
    console.error('Image Upload Error:', err);
    res.status(500).json({
      status: 'error',
      message: 'Server error while uploading image',
    });
  }
};

const uploadResumeFile = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ status: 'fail', message: 'No PDF uploaded' });
    }

    const resumeUrl = `${req.protocol}://${req.get('host')}/docs/resumes/${req.file.filename}`;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        $push: {
          resume: {
            title: req.body.title,
            link: resumeUrl,
            filename: req.file.filename,
          },
        },
      },
      {
        new: true,
      },
    );

    res.status(200).json({
      status: 'success',
      message: 'Resume uploaded successfully',
      data: {
        updatedUser,
      },
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

const deleteResume = async (req, res) => {
  try {
    const userId = req.user.id; // Authenticated user's ID
    const { resumeId } = req.params; // Resume item _id from frontend

    // 1. Find the user
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // 2. Find the resume entry in the array
    const resumeEntry = user.resume.id(resumeId);
    if (!resumeEntry) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    // 3. Build the full file path
    const filePath = path.join(
      __dirname,
      '../public/docs/resumes',
      resumeEntry.filename,
    );

    // 4. Delete the file from the file system
    try {
      await fs.unlink(filePath);
    } catch (fileErr) {
      console.warn('File not found or already deleted:', fileErr.message);
      // You can choose to proceed or fail here. In most cases, it's safe to proceed.
    }

    // 5. Remove the resume entry from the array
    resumeEntry.deleteOne(); // or user.resume.pull(resumeId);

    // 6. Save the updated user document
    await user.save();

    res.status(200).json({ message: 'Resume deleted successfully' });
  } catch (err) {
    console.error('Error deleting resume:', err);
    res.status(500).json({ message: 'Server error while deleting resume' });
  }
};

// Save or Unsave Internship
const toggleSavedInternship = async (req, res) => {
  try {
    const { internshipId } = req.params;
    const { save } = req.body; // expects { save: true } or { save: false }

    if (typeof save !== 'boolean') {
      return res.status(400).json({
        status: 'fail',
        message: 'Missing or invalid "save" flag in request body',
      });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res
        .status(404)
        .json({ status: 'fail', message: 'User not found' });
    }

    const alreadySaved = user.savedInternships.includes(internshipId);

    if (save) {
      if (!alreadySaved) {
        user.savedInternships.push(internshipId);
      }
    } else {
      user.savedInternships.pull(internshipId); // removes from array
    }

    await user.save();

    res.status(200).json({
      status: 'success',
      message: save ? 'Internship saved' : 'Internship removed from saved list',
    });
  } catch (err) {
    console.error('Toggle Save Error:', err);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
};

// Get All Saved Internships
const getSavedInternships = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate({
      path: 'savedInternships',
      select: 'title company location term',
      populate: {
        path: 'company',
        select: 'name industry',
      },
    });

    if (!user) {
      return res
        .status(404)
        .json({ status: 'fail', message: 'User not found' });
    }

    res.status(200).json({
      status: 'success',
      data: {
        savedInternships: user.savedInternships,
      },
    });
  } catch (err) {
    console.error('Get Saved Internships Error:', err);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
};

// Helper function to check if a string field is filled
const isFilled = (value) => typeof value === 'string' && value.trim() !== '';

const getInternProfileCompletion = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    if (user.role !== 'INTERN') {
      return res.status(403).json({ error: 'User is not an intern' });
    }

    // Define relevant fields for interns
    const fields = [
      { name: 'name', check: () => isFilled(user.name) },
      { name: 'email', check: () => isFilled(user.email) },
      { name: 'profileImage', check: () => isFilled(user.profileImage) },
      { name: 'bio', check: () => isFilled(user.bio) },
      { name: 'headline', check: () => isFilled(user.headline) },
      { name: 'website', check: () => isFilled(user.website) },
      { name: 'phoneNumber', check: () => isFilled(user.phoneNumber) },
      {
        name: 'skills',
        check: () => Array.isArray(user.skills) && user.skills.length > 0,
      },
      {
        name: 'education',
        check: () =>
          user.education &&
          isFilled(user.education.university) &&
          isFilled(user.education.degree) &&
          isFilled(user.education.year) &&
          isFilled(user.education.major) &&
          isFilled(user.education.currentYear),
      },
      {
        name: 'resume',
        check: () =>
          Array.isArray(user.resume) &&
          user.resume.some(
            (entry) => isFilled(entry.title) && isFilled(entry.link),
          ),
      },
      {
        name: 'savedInternships',
        check: () =>
          Array.isArray(user.savedInternships) &&
          user.savedInternships.length > 0,
      },
    ];

    // Calculate filled fields
    let filledFields = 0;
    fields.forEach((field) => {
      // eslint-disable-next-line no-plusplus
      if (field.check()) filledFields++;
    });

    // Calculate completion percentage
    const totalFields = fields.length;
    const completionPercentage = Math.round((filledFields / totalFields) * 100);

    // Generate tip
    let tip = '';
    if (completionPercentage < 100) {
      const missingField = fields.find((field) => !field.check());
      if (missingField.name === 'education') {
        const educationFields = [
          'university',
          'degree',
          'year',
          'major',
          'currentYear',
        ];
        const missingSubfield = educationFields.find(
          (subfield) => !isFilled(user.education[subfield]),
        );
        tip = `Please add your ${missingSubfield || 'education details'} to complete your profile.`;
      } else if (missingField.name === 'resume') {
        tip = 'Please add a resume to complete your profile.';
      } else if (missingField.name === 'savedInternships') {
        tip = 'Save at least one internship.';
      } else if (missingField.name === 'skills') {
        tip = 'Add at least one skill to complete your profile.';
      } else if (missingField.name === 'profileImage') {
        tip = 'Upload a Profile Image';
      } else {
        tip = `Please add your ${missingField.name} to complete your profile.`;
      }
    } else {
      tip = 'Great job! Your intern profile is fully complete!';
    }

    res.json({ completionPercentage, tip });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const getCompanyProfileCompletion = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    if (user.role !== 'COMPANY') {
      return res.status(403).json({ error: 'User is not a company' });
    }

    // Define relevant fields for companies
    const fields = [
      { name: 'name', check: () => isFilled(user.name) },
      { name: 'email', check: () => isFilled(user.email) },
      { name: 'profileImage', check: () => isFilled(user.profileImage) },
      { name: 'bio', check: () => isFilled(user.bio) },
      { name: 'headline', check: () => isFilled(user.headline) },
      { name: 'website', check: () => isFilled(user.website) },
      { name: 'phoneNumber', check: () => isFilled(user.phoneNumber) },
      { name: 'industry', check: () => isFilled(user.industry) },
      { name: 'location', check: () => isFilled(user.location) },
      { name: 'verified', check: () => user.verified === true },
    ];

    // Calculate filled fields
    let filledFields = 0;
    fields.forEach((field) => {
      // eslint-disable-next-line no-plusplus
      if (field.check()) filledFields++;
    });

    // Calculate completion percentage
    const totalFields = fields.length;
    const completionPercentage = Math.round((filledFields / totalFields) * 100);

    // Generate tip
    let tip = '';
    if (completionPercentage < 100) {
      const missingField = fields.find((field) => !field.check());
      if (missingField.name === 'verified') {
        tip = 'Please get your company verified to complete your profile.';
      } else {
        tip = `Please add your ${missingField.name} to complete your profile.`;
      }
    } else {
      tip = 'Great job! Your company profile is fully complete!';
    }

    res.json({ completionPercentage, tip });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
const getApplicationsOverview = async (req, res) => {
  try {
    const companyId = req.user.id; // Assuming company ID is in req.user from authentication

    // Step 1: Fetch Total Job Postings
    const totalJobPostings = await Internship.countDocuments({
      company: companyId,
    });

    // Step 2: Fetch Applications Received
    const internships = await Internship.find({ company: companyId }).select(
      '_id',
    );
    const internshipIds = internships.map((internship) => internship._id);
    const applicationsReceived = await Application.countDocuments({
      internship: { $in: internshipIds },
    });

    // Step 3: Fetch Open Positions
    const currentDate = new Date(); // Current date and time: May 25, 2025, 06:43 PM PKT
    const openPositions = await Internship.countDocuments({
      company: companyId,
      live: true,
      expiryDate: { $gt: currentDate },
    });

    // Step 4: Return the results
    res.status(200).json({
      status: 'success',
      data: {
        totalJobPostings,
        applicationsReceived,
        openPositions,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch applications overview',
      error: error.message,
    });
  }
};

const getSystemOverview = async (req, res) => {
  try {
    // Total Users
    const totalUsers = await User.countDocuments();

    // Active Users
    const activeUsers = await User.countDocuments({ isActive: true });

    // Companies Pending Verification
    const companiesPendingVerification = await User.countDocuments({
      role: 'COMPANY',
      verified: false,
    });

    res.status(200).json({
      status: 'success',
      data: {
        totalUsers,
        activeUsers,
        companiesPendingVerification,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch system overview',
      error: error.message,
    });
  }
};

const getActivitySummary = async (req, res) => {
  try {
    // Internships Pending Verification
    const internshipsPendingVerification = await Internship.countDocuments({
      verified: false,
    });

    // Verified Internships
    const verifiedInternships = await Internship.countDocuments({
      verified: true,
    });

    // Verified Companies
    const verifiedCompanies = await User.countDocuments({
      role: 'COMPANY',
      verified: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        internshipsPendingVerification,
        verifiedInternships,
        verifiedCompanies,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch activity summary',
      error: error.message,
    });
  }
};

const getCompaniesPendingVerification = async (req, res) => {
  try {
    // Find all companies that are not verified
    const companies = await User.find({
      role: 'COMPANY',
      verified: false,
    }).select('name email location industry createdAt');

    res.status(200).json({
      status: 'success',
      data: {
        companies,
        total: companies.length,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch companies pending verification',
      error: error.message,
    });
  }
};

module.exports = {
  getCompaniesPendingVerification,
  getActivitySummary,
  getSystemOverview,
  getAllUsers,
  getApplicationsOverview,
  getUser,
  updateUser,
  deleteUser,
  verifyCompany,
  getMe,
  updateMe,
  deleteMe,
  createAdmin,
  uploadProfileImage,
  uploadResumeFile,
  toggleSavedInternship,
  getSavedInternships,
  getInternProfileCompletion,
  getCompanyProfileCompletion,
  deleteResume,
};
