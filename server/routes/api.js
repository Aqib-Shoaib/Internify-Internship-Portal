const express = require('express');

const router = express.Router();
const userRouter = require('./userRoutes');
const internshipRouter = require('./internshipRoutes');
const applicationRouter = require('./applicationRoutes');
const contactRouter = require('./contactRoutes');

router.use('/users', userRouter);
router.use('/internships', internshipRouter);
router.use('/applications', applicationRouter);
router.use('/contact', contactRouter);

module.exports = router;
