const userService = require('../services/userService');

// Controller for user signup
const signup = async (req, res) => {
  try {
    const user = await userService.registerUser(req.body);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    console.error('Registration error:', error);
    
    // Handle unique email error
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Handle validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation error', details: error.errors });
    }

    // Generic error response
    res.status(400).json({ message: 'Error registering user', error: error.message });
  }
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Authenticate the user with the provided email and password
    const token = await userService.loginUser(email, password);

    // If authentication is successful, return a JWT token
    if(token===null)
      res.json({message: "UserName or Password is incorrect"})
    else
      res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Login error:', error);

    // Handle invalid credentials error
    if (error.message === 'Invalid credentials') {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generic error response
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

// Controller for fetching all users
const getAllUsers = async (req, res) => {
  try {
    const users = await userService.fetchAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};




module.exports = {
  signup,
  getAllUsers,
  login

};
