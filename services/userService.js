const User = require('../models/User');
const bcrypt = require('bcrypt');

// Service for registering a new user
const registerUser = async (userData) => {
  const { name, email, password } = userData;

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user instance
  const user = new User({ name, email, password: hashedPassword });
  
  // Save the user to the database
  return user.save();
};

// Service for fetching all users
const fetchAllUsers = async () => {
  return User.find();
};

// Service for logging in a user
const loginUser = async (email, password) => {
  // Find the user by email
  const user = await User.findOne({ email });

  // If user does not exist, return null
  if (!user) {
    return null;
  }

  // Compare the provided password with the stored hashed password
  const isMatch = await bcrypt.compare(password, user.password);
  
  // If passwords do not match, return null
  if (!isMatch) {
    return null;
  }

  // If login is successful, return the user object
  return user;
};


module.exports = {
  registerUser,
  loginUser,
  fetchAllUsers
};
