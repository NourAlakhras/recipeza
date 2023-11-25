// Backend\controllers\authController.js
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const postSignup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already registered. Please use a different email address.' });
        }

        // Create a new user with a hashed password
        const newUser = await User.create({ name, email, password });

        // Generate a JWT token
        // If the credentials are valid, generate a JWT token
        const token = jwt.sign(
            {
                userId: newUser.id,
                email: newUser.email,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "2h", // Token expires in 2 hours
            }
        );

        res.json({ token, message: "Login successful." });
    } catch (error) {
        if (error.name === 'ValidationError') {
            // Handle validation errors
            const errorMessage = Object.values(error.errors).map((err) => err.message).join(', ');
            return res.status(400).json({ error: `Validation failed: ${errorMessage}` });
        }

        console.error('Error in postSignup:', error);
        res.status(500).json({ error: 'Internal Server Error. Please try again later.' });
    }
};

// Function to handle user login
const postLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Authenticate the user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password. Please check your credentials.' });
        }

        // Compare the entered password with the stored hashed password
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Invalid email or password. Please check your credentials.' });
        }

        // If the credentials are valid, generate a JWT token
        const token = jwt.sign(
            {
                userId: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "2h", // Token expires in 2 hours
            }
        );

        res.json({ token, message: "Login successful." });
    } catch (error) {
        console.error('Error in postLogin:', error);
        res.status(500).json({ error: 'Internal Server Error. Please try again later.' });
    }
};


module.exports = {
    postSignup,
    postLogin,
};
