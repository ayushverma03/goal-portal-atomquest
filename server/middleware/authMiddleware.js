import jwt from 'jsonwebtoken';
import { CustomError } from './errorMiddleware.js';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } 
  else if (req.query && req.query.token) {
    token = req.query.token;
  }

  if (!token) {
    throw new CustomError('Not authorized to access this resource, token missing', 401);
  }

  try {
    // Verify token validity
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch the user from database and attach to the request object (excluding password)
    req.user = await User.findById(decoded.id).select('-password');
    
    if (!req.user) {
      throw new CustomError('The user belonging to this token no longer exists', 401);
    }

    next();
  } catch (error) {
    throw new CustomError('Not authorized, token failed or expired', 401);
  }
};

// Middleware to restrict access to specific structural roles
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError(`Role [${req.user.role}] is not authorized to access this route`, 403);
    }
    next();
  };
};