const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

// Register new user
const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ status: 'error', message: 'User already exists' });
        }

        const user = await User.create({
            username,
            email,
            password
        });

        res.status(201).json({
            status: 'success',
            userId: user._id,
            token: generateToken(user._id)
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error registering user' });
    }
};

// User login
const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (user && (await user.matchPassword(password))) {
            res.json({
                status: 'success',
                userId: user._id,
                token: generateToken(user._id)
            });
        } else {
            res.status(401).json({ status: 'error', message: 'Invalid username or password' });
        }
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error logging in' });
    }
};

// User logout (if using token blacklist or other mechanism)
const logoutUser = (req, res) => {
    res.json({ status: 'success', message: 'Logged out successfully' });
};

module.exports = { registerUser, loginUser, logoutUser };
