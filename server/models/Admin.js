const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Admin Schema
const AdminSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  role: { type: String, required: true },
});
const Admin = mongoose.model("Admin", AdminSchema);
module.exports = Admin;
