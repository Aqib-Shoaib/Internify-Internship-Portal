const mongoose = require("mongoose");

const { Schema } = mongoose;

// User Schema
const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true, select: false },
  userType: {
    type: String,
    enum: ["INTERN", "COMPANY", "ADMIN"],
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
const User = mongoose.model("User", UserSchema);

module.exports = User;
