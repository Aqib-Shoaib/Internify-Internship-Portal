const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InternSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  resumeUrl: { type: String },
  skills: { type: [String], default: [] },
  education: { type: String },
});
const Intern = mongoose.model("Intern", InternSchema);

module.exports = Intern;
