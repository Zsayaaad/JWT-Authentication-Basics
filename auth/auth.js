require('dotenv').config();
const { UnauthorizedError } = require('../errors/index');
const jwt = require('jsonwebtoken');

const authorizationMiddleware = (req, res, next) => {
  // console.log(req.headers);
  const authHeader = req.headers.authorization;
  // console.log(authHeader);
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthorizedError('No token provided');
  }
  const token = authHeader.split(' ')[1];
  // console.log(token);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded);
    req.user = decoded;
    next(); // Pass to next middleware
  } catch (error) {
    throw new UnauthorizedError(`You are not authorized to access this route`);
  }
};

module.exports = authorizationMiddleware;
