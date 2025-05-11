const jwt = require('jsonwebtoken');

const User = require('../models/User'); //

const authMiddleware = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  const token = authHeader ? authHeader.replace('Bearer ', '') : null;
  if (!token)
    return res.status(401).json({ error: 'Access denied, no token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) return res.status(404).json({ error: 'User not found' });
    req.user = currentUser; // Attach user to request object
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

const roleMiddleware = (allowedRoles) => (req, res, next) => {
  if (!allowedRoles.includes(req.user.userType)) {
    return res
      .status(403)
      .json({ error: 'Access denied, insufficient permissions' });
  }
  next();
};

module.exports = { authMiddleware, roleMiddleware };
