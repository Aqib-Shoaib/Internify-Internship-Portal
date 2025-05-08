const mongoose = require("mongoose");

const { Schema } = mongoose;

// Review Schema
const ReviewSchema = new Schema({
  reviewerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  reviewedUserId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  internshipId: { type: Schema.Types.ObjectId, ref: "Internship" },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;
