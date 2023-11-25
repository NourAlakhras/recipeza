// Backend\controllers\authController.js
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const postSignup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        // Create a new user with hashed password
        const newUser = await User.create({ name, email, password });

        // Generate a JWT token
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: "2h",
        });

        res.cookie('token', token, { httpOnly: true });
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        if (error.name === 'ValidationError') {
            // Handle validation errors
            const errorMessage = Object.values(error.errors).map((err) => err.message).join(', ');
            return res.status(400).json({ error: errorMessage });
        }

        console.error('Error in postSignup:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// Function to handle user login
const postLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Authenticate the user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Compare the entered password with the stored hashed password
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "2h",
        });

        res.cookie('token', token, { httpOnly: true });
        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        console.error('Error in postLogin:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Function to handle user logout
const logout = (req, res) => {
    res.clearCookie('token');
};

module.exports = {
    postSignup,
    postLogin,
    logout,
};
