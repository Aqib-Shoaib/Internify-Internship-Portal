const mongoose = require("mongoose");

const { Schema } = mongoose;

// Admin Schema
const AdminSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  role: { type: String, required: true }, //role has been added for scalability purposes
});
const Admin = mongoose.model("Admin", AdminSchema);
module.exports = Admin;
