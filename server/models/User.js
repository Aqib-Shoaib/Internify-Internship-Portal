// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false }, // hashed

    role: {
      type: String,
      enum: ['INTERN', 'COMPANY', 'ADMIN'],
      required: true,
    },

    profileImage: { type: String }, // Can be used as profile image or company logo
    bio: { type: String },
    headline: { type: String },
    website: { type: String },
    phoneNumber: { type: String },

    // Intern-specific fields
    skills: [String],
    education: [
      {
        school: String,
        degree: String,
        year: String,
      },
    ],
    resume: [
      {
        title: String,
        link: String,
        createdAt: { type: Date, default: Date.now() },
      },
    ],
    savedInternships: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Internship',
      },
    ],

    // Company-specific fields
    industry: { type: String },
    location: { type: String },
    verified: { type: Boolean, default: false },
    passwordResetToken: String,
    passwordResetExpires: Date,
    otp: String,
    otpExpires: Date,
    allowLogin: { type: Boolean, default: false }, // prevent login before verification

    // Common control fields
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
