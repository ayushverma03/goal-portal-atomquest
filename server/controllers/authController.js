import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { CustomError } from '../middleware/errorMiddleware.js';

// Helper function to design a secure 24-hour token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '24h',
  });
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
export const login = async (req, res) => {
  const { email, password } = req.body;

  // Validate presence of email and password
  if (!email || !password) {
    throw new CustomError('Please provide both email and password', 400);
  }

  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError('Invalid email credentials or user does not exist', 401);
  }

  // Validate matching password hash
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new CustomError('Invalid password credentials', 401);
  }

  // Generate token and respond
  const token = generateToken(user._id);

  res.status(200).json({
    success: true,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
    },
  });
};

// @desc    Get current logged in user profile
// @route   GET /api/auth/me
export const getMe = async (req, res) => {
  // req.user is automatically populated by our protect middleware
  res.status(200).json({
    success: true,
    user: req.user,
  });
};