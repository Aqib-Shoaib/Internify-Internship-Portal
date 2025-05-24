const Application = require('../models/InternshipApplication');
const Internship = require('../models/Internship');
const User = require('../models/User');

const buildFilter = (query) => {
  const filter = {};
  if (query.status) filter.status = query.status;
  if (query.reviewed) filter.reviewed = query.reviewed === 'true';
  if (query.internshipId) filter.internship = query.internshipId;
  if (query.internId) filter.intern = query.internId;
  return filter;
};

const createApplication = async (req, res) => {
  try {
    const { internship: internshipId, coverLetter, resumeLink } = req.body;

    // 1. Check if internship exists and fetch its status
    const internship = await Internship.findById(internshipId);
    if (!internship) {
      return res.status(404).json({ message: 'Internship not found' });
    }

    const { verified, live, expiryDate } = internship;

    // 2. Block if internship shouldn't accept applications
    if (!verified || !live || expiryDate < Date.now()) {
      return res.status(400).json({
        message: 'Internship is not accepting applications at this time',
      });
    }

    // 3. Prevent duplicate applications
    const exists = await Application.findOne({
      intern: req.user._id,
      internship: internshipId,
    });

    if (exists) {
      return res.status(400).json({ message: 'Already applied' });
    }

    // 4. Create application
    const application = await Application.create({
      intern: req.user._id,
      internship: internshipId,
      coverLetter,
      resumeLink,
    });

    res.status(201).json({ status: 'success', data: application });
  } catch (err) {
    console.error('Application Error:', err);
    res.status(500).json({ status: 'fail', message: 'Server Error' });
  }
};

const getMyApplications = async (req, res) => {
  try {
    const filter = buildFilter(req.query);
    filter.intern = req.user._id;

    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const skip = (page - 1) * limit;

    // Parse sort query parameter (e.g., ?sort=status:asc,appliedAt:desc)
    const sortQuery = req.query.sort || 'appliedAt:desc';
    const sortFields = {};

    // Split multiple sort criteria (e.g., "status:asc,appliedAt:desc")
    sortQuery.split(',').forEach((sortItem) => {
      const [field, order] = sortItem.split(':');
      // Validate field and order
      const validFields = ['status', 'appliedAt', 'reviewed']; // Restrict to valid fields
      const validOrders = ['asc', 'desc'];
      if (validFields.includes(field) && validOrders.includes(order)) {
        sortFields[field] = order === 'asc' ? 1 : -1;
      }
    });

    // Ensure at least one valid sort field (fallback to default if none valid)
    if (Object.keys(sortFields).length === 0) {
      sortFields.appliedAt = -1;
    }

    const applications = await Application.find(filter)
      .populate({
        path: 'internship',
        select: 'title company', // Select fields from Internship
        populate: {
          path: 'company', // Populate the company field in Internship
          select: 'name', // Select fields from User (or Company)
        },
      })
      .skip(skip)
      .limit(limit)
      .sort(sortFields);

    res.status(200).json({ status: 'success', data: applications });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: 'Server Error' });
  }
};

const getApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id).populate(
      'internship',
    );
    if (!application)
      return res.status(404).json({ message: 'Application not found' });
    if (!application.intern.equals(req.user._id))
      return res.status(403).json({ message: 'Unauthorized' });

    res.status(200).json({ status: 'success', data: application });
  } catch (err) {
    res.status(403).json({ status: 'fail', message: 'Server Error' });
  }
};

const getInternshipApplications = async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.internshipId);
    if (!internship || !internship.company.equals(req.user.id))
      return res.status(403).json({ message: 'Unauthorized' });

    const filter = buildFilter(req.query);
    filter.internship = req.params.internshipId;

    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const skip = (page - 1) * limit;

    const applications = await Application.find(filter)
      .populate('intern', 'name email')
      .skip(skip)
      .limit(limit);

    res.status(200).json({ status: 'success', data: applications });
  } catch (err) {
    res.status(403).json({ status: 'fail', message: 'Server Error' });
  }
};

const updateApplicationStatus = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id).populate(
      'internship',
    );
    if (
      !application ||
      !application.internship.company.equals(req.user.companyId)
    )
      return res.status(403).json({ message: 'Unauthorized' });

    const updates = req.body;
    updates.reviewed = true; // auto mark reviewed

    const updated = await Application.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true },
    );
    res.status(200).json({ status: 'success', data: updated });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

const getAllApplications = async (req, res) => {
  try {
    const filter = buildFilter(req.query);
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const skip = (page - 1) * limit;

    const applications = await Application.find(filter)
      .populate('intern internship')
      .skip(skip)
      .limit(limit);

    res.status(200).json({ status: 'success', data: applications });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: 'Server Error' });
  }
};

const getApplicationByAdmin = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id).populate(
      'intern internship',
    );
    if (!application)
      return res.status(404).json({ message: 'Application not found' });

    // Optional reviewed update can be added here if needed
    res.status(200).json({ status: 'success', data: application });
  } catch (err) {
    res.status(404).json({ status: 'fail', message: 'Server Error' });
  }
};

const deleteApplicationByAdmin = async (req, res) => {
  try {
    await Application.findByIdAndDelete(req.params.id);
    res.status(204).json({ status: 'success', data: null });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: 'Server Error' });
  }
};

const getInternApplicationStats = async (req, res) => {
  try {
    // Validate user exists and is an intern
    const user = await User.findById(req.params.internId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    if (user.role !== 'INTERN') {
      return res.status(403).json({ error: 'User is not an intern' });
    }

    // Query applications for the intern
    const totalApplications = await Application.countDocuments({
      intern: req.params.internId,
    });
    const acceptedApplications = await Application.countDocuments({
      intern: req.params.internId,
      status: 'accepted',
    });
    const rejectedApplications = await Application.countDocuments({
      intern: req.params.internId,
      status: 'rejected',
    });

    // Calculate success rate
    const successRate =
      totalApplications > 0
        ? Number(((acceptedApplications / totalApplications) * 100).toFixed(2))
        : 0;

    // Return stats
    res.json({
      totalApplications,
      acceptedApplications,
      rejectedApplications,
      successRate,
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  createApplication,
  getMyApplications,
  getApplication,
  getInternshipApplications,
  updateApplicationStatus,
  getAllApplications,
  getApplicationByAdmin,
  deleteApplicationByAdmin,
  getInternApplicationStats,
};
