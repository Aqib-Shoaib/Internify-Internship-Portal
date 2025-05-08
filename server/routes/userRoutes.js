const express = require("express");
const { authMiddleware, roleMiddleware } = require("../middleware/auth");
const {
  getUser,
  deleteUser,
  updateUser,
  getAllUsers,
  getAllInterns,
  getAllCompanies,
  getAllAdmins,
} = require("../controllers/userController");
const {
  createUser,
  createAdmin,
  updatePassword,
  login,
} = require("../controllers/authController");

const userRouter = express.Router();

userRouter.post("/register", createUser);
userRouter.post("/login", login);

userRouter.use(authMiddleware);

userRouter.get("/me", getUser);
userRouter.delete("/me", deleteUser); //self delete for now
userRouter.patch("/password", updatePassword);
userRouter.patch(
  "/me",
  roleMiddleware(["INTERN", "COMPANY"]), //admin can not update his/her profile as there is not much other than role yet
  updateUser,
);

userRouter.use(roleMiddleware(["ADMIN"]));

userRouter.post("/admin", createAdmin);
userRouter.get("/", getAllUsers);
userRouter.get("/interns", getAllInterns);
userRouter.get("/companies", getAllCompanies);
userRouter.get("/admins", getAllAdmins);

module.exports = userRouter;
