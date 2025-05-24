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

    const resumeUrl = `/docs/resumes/${req.file.filename}`;
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        resume: {
          title: req.body.title,
          link: resumeUrl,
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
      select: 'title company location deadline', // adjust as needed
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
  uploadProfileImage,
  uploadResumeFile,
  toggleSavedInternship,
  getSavedInternships,
  getInternProfileCompletion,
  getCompanyProfileCompletion,
};
