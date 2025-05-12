const slugify = require('slugify');

const Internship = require('../models/Internship');

const getInternships = async (req, res) => {
  try {
    const {
      location,
      skills,
      minSalary,
      maxSalary,
      sort = 'createdAt', // default sorting by creation date
      page = 1,
      limit = 10,
    } = req.query;

    // Building the filter object
    const filter = {
      live: true,
      verified: true,
      expiryDate: { $gt: new Date() },
    };

    if (location) filter.location = { $regex: location, $options: 'i' };
    if (skills) filter.skills = { $in: skills.split(',') }; // assuming skills is a comma-separated string
    if (minSalary) filter.salary = { $gte: minSalary };
    if (maxSalary) filter.salary = { $lte: maxSalary };

    const internships = await Internship.find(filter)
      .populate('company', 'name') // populating company name only
      .sort({ [sort]: -1 }) // sort by provided field, default to descending order
      .skip((page - 1) * limit)
      .limit(parseInt(limit, 10));

    res.status(200).json({ internships });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching internships' });
  }
};

const getInternshipBySlug = async (req, res) => {
  try {
    const internship = await Internship.findOne({
      slug: req.params.slug,
    }).populate('company');

    if (
      !internship ||
      !internship.live ||
      !internship.verified ||
      internship.expiryDate < new Date()
    ) {
      return res
        .status(404)
        .json({ message: 'Internship not found or expired' });
    }

    res.status(200).json({ internship });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching internship' });
  }
};

const searchInternships = async (req, res) => {
  try {
    const { q } = req.query;
    const internships = await Internship.find({
      $text: { $search: q },
      //   live: true,
      //   verified: true,
      expiryDate: { $gt: new Date() },
    })
      .populate('company', 'name')
      .limit(10); // Limit to 10 results

    res.status(200).json({ internships });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error searching internships' });
  }
};

const sponsoredInternships = async (req, res) => {
  try {
    const internships = await Internship.find({
      sponsored: true,
      live: true,
      verified: true,
      expiryDate: { $gt: new Date() },
    }).populate('company', 'name');

    res.status(200).json({ internships });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching sponsored internships' });
  }
};

const createInternship = async (req, res) => {
  try {
    const { title, ...rest } = req.body;

    const internship = await Internship.create({
      title,
      slug: slugify(title, { lower: true }),
      company: req.user.id,
      live: false,
      verified: false,
      ...rest,
    });

    res.status(201).json({ status: 'success', data: internship });
  } catch (err) {
    res.status(500).json({ message: 'Error creating internship' });
  }
};

const getCompanyInternships = async (req, res) => {
  try {
    const internships = await Internship.find({ company: req.user.id }).sort(
      '-createdAt',
    );
    res.status(200).json({
      status: 'success',
      results: internships.length,
      data: internships,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching internhips' });
  }
};

const updateInternship = async (req, res) => {
  try {
    const { id } = req.params;

    const internship = await Internship.findOne({
      _id: id,
      company: req.user.id,
    });
    if (!internship)
      return res.status(404).json({ message: 'Internship not found' });

    if (req.body.title) {
      internship.title = req.body.title;
      internship.slug = slugify(req.body.title, { lower: true });
    }

    Object.assign(internship, req.body);

    await internship.save();
    res.status(200).json({ status: 'success', data: internship });
  } catch (err) {
    res.status(500).json({ message: 'Error updating internship' });
  }
};

const deleteInternship = async (req, res) => {
  try {
    const internship = await Internship.findOneAndDelete({
      _id: req.params.id,
      company: req.user.id,
    });
    if (!internship)
      return res.status(404).json({ message: 'Internship not found' });

    res.status(204).json({ status: 'success', message: 'Internship deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error Deleting internship' });
  }
};

const toggleLiveStatus = async (req, res) => {
  try {
    const internship = await Internship.findOne({
      _id: req.params.id,
      company: req.user.id,
    });
    if (!internship)
      return res.status(404).json({ message: 'Internship not found' });

    internship.live = !internship.live;
    await internship.save();

    res.status(200).json({
      status: 'success',
      data: { live: internship.live, title: internship.title },
    });
  } catch (err) {
    res.status.json({ message: 'Error changing live status' });
  }
};

const deleteInternshipByAdmin = async (req, res) => {
  try {
    const internship = await Internship.findByIdAndDelete(req.params.id);
    if (!internship)
      return res.status(404).json({ message: 'Internship not found' });

    res.status(204).json({ message: 'Internship deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Deletion failed' });
  }
};

const unverifyInternship = async (req, res) => {
  try {
    const internship = await Internship.findByIdAndUpdate(
      req.params.id,
      { verified: false },
      { new: true },
    );
    if (!internship)
      return res.status(404).json({ message: 'Internship not found' });

    res
      .status(200)
      .json({ message: 'Internship unverified', data: internship });
  } catch (err) {
    res.status(500).json({ message: 'Unverification failed' });
  }
};

const verifyInternship = async (req, res) => {
  try {
    const internship = await Internship.findByIdAndUpdate(
      req.params.id,
      { verified: true },
      { new: true },
    );
    if (!internship)
      return res.status(404).json({ message: 'Internship not found' });

    res.status(200).json({ message: 'Internship verified', data: internship });
  } catch (err) {
    res.status(500).json({ message: 'Verification failed' });
  }
};

const getAllInternshipsForAdmin = async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'limit', 'sort'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // Text match filters
    if (queryObj.title) {
      queryObj.title = { $regex: queryObj.title, $options: 'i' };
    }
    if (queryObj.name) {
      queryObj.name = { $regex: queryObj.name, $options: 'i' };
    }

    const sortBy = req.query.sort
      ? req.query.sort.split(',').join(' ')
      : '-createdAt';
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const internships = await Internship.find(queryObj)
      .sort(sortBy)
      .skip(skip)
      .limit(limit);

    res.status(200).json({ total: internships.length, data: internships });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch internships' });
  }
};

module.exports = {
  getInternships,
  getInternshipBySlug,
  deleteInternshipByAdmin,
  searchInternships,
  sponsoredInternships,
  unverifyInternship,
  createInternship,
  updateInternship,
  toggleLiveStatus,
  deleteInternship,
  getCompanyInternships,
  verifyInternship,
  getAllInternshipsForAdmin,
};
