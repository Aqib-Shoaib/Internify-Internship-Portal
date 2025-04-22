require("dotenv").config();
const express = require("express");
const connectToMongodb = require("./config/database");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}
app.use(express.json());

// Routes
const apiRoutes = require("./routes/api");
app.use("/api", apiRoutes);

// Basic route
app.get("/", (req, res) => {
  res.send("Are you sure you belong here!!?");
});

// Connect to MongoDB Atlas and start server
connectToMongodb()
  .then(() => {
    server = app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port : ${PORT}`);
    });
  })
  .catch((err) => console.log("MONGO db connection failed !!! ", err));
