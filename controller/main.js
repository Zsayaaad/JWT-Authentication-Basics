const { BadRequestError } = require('../errors/index');
const jwt = require('jsonwebtoken');
require('dotenv').config();
require('../auth/auth');

exports.login = async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  const id = new Date().getDate();

  if (!username || !password) {
    throw new BadRequestError('Please provide email and password');
  }

  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  res.status(200).json({ msg: 'User created', token });
};

exports.dashboard = async (req, res) => {
  console.log(req.user); // { id: 3, username: 'ALi', iat: 1706948272, exp: 1709540272 }

  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello ${req.user.username}`,
    secret: `Here is ur auth data, your lucky number is ${luckyNumber}`,
  });
};
