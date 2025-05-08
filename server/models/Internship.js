const mongoose = require("mongoose");

const { Schema } = mongoose;

// Internship Schema
const InternshipSchema = new Schema({
  companyId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  isRemote: { type: Boolean, default: false },
  status: { type: String, enum: ["OPEN", "CLOSED"], default: "OPEN" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
const Internship = mongoose.model("Internship", InternshipSchema);

module.exports = Internship;
