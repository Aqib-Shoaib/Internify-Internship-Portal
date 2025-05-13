const mongoose = require('mongoose');
const { generateSlug } = require('../middleware/general');

const { Schema } = mongoose;

const internshipSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true, required: true },
    description: { type: String, required: true },
    company: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    location: { type: String, required: true },
    salary: { type: Number, required: true },
    live: { type: Boolean, default: true },
    expiryDate: { type: Date, required: true },
    sponsored: { type: Boolean, default: false },
    verified: { type: Boolean, default: false },
    term: { type: String, enum: ['PART-TIME', 'FULL-TIME'] },
    duration: { type: Number, required: true }, // Duration in months
  },
  {
    timestamps: true,
  },
);
internshipSchema.index({
  title: 'text',
  description: 'text',
  location: 'text',
});

internshipSchema.pre('save', function (next) {
  if (this.isModified('title')) {
    this.slug = generateSlug(this.title);
  }
  next();
});

module.exports = mongoose.model('Internship', internshipSchema);
