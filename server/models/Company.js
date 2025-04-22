const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Company Schema
const CompanySchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  companyName: { type: String, required: true },
  industry: { type: String },
  location: { type: String },
  website: { type: String },
});
const Company = mongoose.model("Company", CompanySchema);

module.exports = Company;
