const express = require('express');
const { handleContactForm } = require('../controllers/contactController');

const contactRouter = express.Router();

contactRouter.post('/', handleContactForm);

module.exports = contactRouter;
