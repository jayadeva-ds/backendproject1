const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // Import user controller

// User signup route
router.post('/signup', userController.signup);
// Route for user login
router.post('/login', userController.login);

// Fetch all users route
router.get('/', userController.getAllUsers);

// Export the router
module.exports = router;
