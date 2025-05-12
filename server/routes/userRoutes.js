const express = require('express');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');
const {
  register,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
  verifyOtp,
} = require('../controllers/authController');
const {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  verifyCompany,
  getMe,
  updateMe,
  deleteMe,
  createAdmin,
  uploadProfileImage,
  uploadResumeFile,
} = require('../controllers/userController');
const upload = require('../utils/multer');
const { uploadResume } = require('../utils/pdfMulter');

const userRouter = express.Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.patch('/verifyOTP', verifyOtp);
userRouter.post('/forgotPassword', forgotPassword);
userRouter.patch('/resetPassword', resetPassword);

userRouter.use(authMiddleware);

userRouter.get('/me', getMe);
userRouter.delete('/me', deleteMe); //self delete for now
userRouter.patch('/password', updatePassword);
userRouter.patch(
  '/uploadResume',
  uploadResume.single('resume'), // input name must be 'resume'
  uploadResumeFile,
);
userRouter.patch(
  '/uploadProfile',
  upload.single('profileImage'),
  uploadProfileImage,
);
userRouter.patch(
  '/me',
  roleMiddleware(['INTERN', 'COMPANY']), //admin can not update his/her profile as there is not much other than role yet
  updateMe,
);

userRouter.use(roleMiddleware(['ADMIN']));
userRouter.post('/createAdmin', createAdmin);
userRouter.get('/', getAllUsers);
userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);
userRouter.post('/verify/:id', verifyCompany);

module.exports = userRouter;
