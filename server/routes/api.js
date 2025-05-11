const express = require('express');

const router = express.Router();
const userRouter = require('./userRoutes');
const internshipRouter = require('./internshipRoutes');
const applicationRouter = require('./applicationRoutes');

router.use('/users', userRouter);
router.use('/internships', internshipRouter);
router.use('/applications', applicationRouter);

module.exports = router;
