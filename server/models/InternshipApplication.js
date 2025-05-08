const mongoose = require("mongoose");

const { Schema } = mongoose;

// Internship Application Schema
const InternshipApplicationSchema = new Schema({
  internId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  internshipId: {
    type: Schema.Types.ObjectId,
    ref: "Internship",
    required: true,
  },
  coverLetter: { type: String },
  status: {
    type: String,
    enum: ["PENDING", "ACCEPTED", "REJECTED"],
    default: "PENDING",
  },
  appliedAt: { type: Date, default: Date.now },
});
const InternshipApplication = mongoose.model(
  "InternshipApplication",
  InternshipApplicationSchema,
);

module.exports = InternshipApplication;
