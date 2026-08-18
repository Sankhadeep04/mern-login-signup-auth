import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Helper to generate JWT token
const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET || 'super_secret_jwt_key_mern_auth_2026_antigravity',
    { expiresIn: '7d' }
  );
};

// @route   POST /api/auth/signup
// @desc    Register a new user in MongoDB
// @access  Public
router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide both email and password' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    // Check if user already exists
    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return res.status(400).json({ message: 'An account with this email already exists' });
    }

    // Create user in database
    const user = await User.create({
      email: normalizedEmail,
      password
    });

    if (user) {
      const token = generateToken(user._id);
      return res.status(201).json({
        success: true,
        message: 'Account created successfully!',
        token,
        user: {
          id: user._id,
          email: user.email,
          createdAt: user.createdAt
        }
      });
    } else {
      return res.status(400).json({ message: 'Invalid user data received' });
    }
  } catch (error) {
    console.error('[Signup Error]:', error);
    return res.status(500).json({ message: error.message || 'Server error during registration' });
  }
});

// @route   POST /api/auth/login
// @desc    Authenticate user against MongoDB & get token
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide both email and password' });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });

    if (user && (await user.matchPassword(password))) {
      const token = generateToken(user._id);
      return res.json({
        success: true,
        message: 'Logged in successfully!',
        token,
        user: {
          id: user._id,
          email: user.email,
          createdAt: user.createdAt
        }
      });
    } else {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('[Login Error]:', error);
    return res.status(500).json({ message: error.message || 'Server error during authentication' });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user profile
// @access  Private
router.get('/me', protect, async (req, res) => {
  try {
    return res.json({
      success: true,
      user: {
        id: req.user._id,
        email: req.user.email,
        createdAt: req.user.createdAt
      }
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching user profile' });
  }
});

// @route   GET /api/auth/all-users
// @desc    Get list of all registered users in MongoDB database
// @access  Public
router.get('/all-users', async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    const totalCount = await User.countDocuments();
    return res.json({
      success: true,
      count: totalCount,
      users: users.map(u => ({
        id: u._id,
        email: u.email,
        createdAt: u.createdAt
      }))
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error querying database' });
  }
});

export default router;

