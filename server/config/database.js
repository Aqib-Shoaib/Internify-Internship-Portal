const mongoose = require("mongoose");

const connectToMongodb = async () => {
  const DB_URL = process.env.DB_URI.replace(
    "<DB_PASSWORD>",
    process.env.DB_PASSWORD
  );
  console.log("Connecting to MongoDB Atlas...");

  return mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectToMongodb;
