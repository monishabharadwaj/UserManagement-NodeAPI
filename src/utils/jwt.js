const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'change_this_in_production';

function generateToken(user) {
  // Sign minimal payload to keep token small
  const payload = { id: user.id, username: user.username };
  return jwt.sign(payload, SECRET, { expiresIn: '7d' });
}

function verifyToken(token) {
  return jwt.verify(token, SECRET);
}

module.exports = { generateToken, verifyToken };
