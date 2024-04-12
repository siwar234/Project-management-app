// middleware/auth.js

const jwt = require('jsonwebtoken');
const User = require('../models/User'); 

const authMiddleware = async (req, res, next) => {
    let token = req.header("Authorization");

    if (token) {
        if (token.startsWith("Bearer ")) {
          token = token.slice(7, token.length).trimLeft();
              }}
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { id } = decoded; 
    const user = await User.findById(id);
    if (!user) {
      return res.status(401).json({ message: 'Invalid token - User not found' });
    }
    req.user = { id: user._id };
    console.log(decoded);
    next();
} catch (error) {
    console.error('Error in auth middleware:', error);

    console.error('JWT Verification Error:', error.message);

    return res.status(402).json({ message: 'Invalid token' });
  }
};


module.exports = authMiddleware;