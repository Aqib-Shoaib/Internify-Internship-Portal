const express = require('express');
const {
  getInternships,
  getInternshipBySlug,
  //   searchInternships,
  sponsoredInternships,
  createInternship,
  getCompanyInternships,
  updateInternship,
  deleteInternship,
  toggleLiveStatus,
  getAllInternshipsForAdmin,
  verifyInternship,
  unverifyInternship,
  deleteInternshipByAdmin,
} = require('../controllers/internshipController');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

const internshipRouter = express.Router();

// Public routes
internshipRouter.get('/all', getInternships);
internshipRouter.get('/all/:slug', getInternshipBySlug);
// internshipRouter.get('/all/search', searchInternships);
internshipRouter.get('/sponsored', sponsoredInternships);

// Authenticated routes
internshipRouter.use(authMiddleware);

// Company routes
internshipRouter
  .route('/company')
  .post(roleMiddleware(['COMPANY']), createInternship)
  .get(roleMiddleware(['COMPANY']), getCompanyInternships);
internshipRouter
  .route('/company/:id')
  .patch(roleMiddleware(['COMPANY']), updateInternship)
  .delete(roleMiddleware(['COMPANY']), deleteInternship);
internshipRouter.patch(
  '/company/:id/toggle-live',
  roleMiddleware(['COMPANY']),
  toggleLiveStatus,
);

// Admin routes
internshipRouter.use(roleMiddleware(['ADMIN']));

internshipRouter.get('/admin', getAllInternshipsForAdmin);
internshipRouter.patch('/admin/verify/:id', verifyInternship);
internshipRouter.patch('/admin/unverify/:id', unverifyInternship);
internshipRouter.delete('/admin/:id', deleteInternshipByAdmin);

module.exports = internshipRouter;
