const jwt = require('jsonwebtoken');
const User = require('../models/User');
const dotenv = require('dotenv');
dotenv.config();

module.exports = async function (req, res, next) {
  try {
    // Get token from Authorization header (format: 'Bearer <token>')
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token mropr , authorization denied' });
    }
    const token = authHeader.replace('Bearer ', '');

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by decoded id and exclude password
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({ message: 'User not found, authorization denied' });
    }

    // Attach user to request object
    req.user = user;
    next();

  } catch (err) {
    console.error('Auth middleware error:', err);
    return res.status(401).json({ message: 'Token is not valid' });
  }
};
