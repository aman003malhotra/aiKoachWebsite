const express = require('express');
const router = express.Router();
const userController = require('../controllers/enquiry.Controller'); // Assuming the controller file is in a "controllers" directory

// Define routes
router.post('/enquirenow', userController.createUser);

module.exports = router;
