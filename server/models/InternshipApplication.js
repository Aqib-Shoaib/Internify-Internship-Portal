const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  intern: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  internship: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Internship',
    required: true,
  },
  coverLetter: {
    type: String,
  },
  status: {
    type: String,
    enum: ['pending', 'shortlisted', 'accepted', 'rejected'],
    default: 'pending',
  },
  appliedAt: {
    type: Date,
    default: Date.now,
  },
  reviewed: {
    type: Boolean,
    default: false,
  },
  resumeLink: {
    type: String,
  },
});

// Ensure an intern can only apply to one internship once
applicationSchema.index({ intern: 1, internship: 1 }, { unique: true });

const Application = mongoose.model('Application', applicationSchema);
module.exports = Application;
