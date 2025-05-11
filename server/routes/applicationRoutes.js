const express = require('express');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');
const {
  createApplication,
  getMyApplications,
  getApplication,
  getInternshipApplications,
  updateApplicationStatus,
  getAllApplications,
  getApplicationByAdmin,
  deleteApplicationByAdmin,
} = require('../controllers/applicationController');

const applicationRouter = express.Router();

applicationRouter.use(authMiddleware);

// Intern-only
applicationRouter.post('/', roleMiddleware(['INTERN']), createApplication);
applicationRouter.get('/my', roleMiddleware(['INTERN']), getMyApplications);
applicationRouter.get('/my/:id', roleMiddleware(['INTERN']), getApplication);

// Company-only
applicationRouter.get(
  '/company/:internshipId',
  roleMiddleware(['COMPANY']),
  getInternshipApplications,
);
applicationRouter.patch(
  '/company/status/:id',
  roleMiddleware(['COMPANY']),
  updateApplicationStatus,
);

// Admin-only
applicationRouter.get('/', roleMiddleware(['ADMIN']), getAllApplications);
applicationRouter.get('/:id', roleMiddleware(['ADMIN']), getApplicationByAdmin);
applicationRouter.delete(
  '/:id',
  roleMiddleware(['ADMIN']),
  deleteApplicationByAdmin,
);

module.exports = applicationRouter;
