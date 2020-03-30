const jwt = require('jsonwebtoken');

const generateToken = (user, expiresIn) => {
  var u = {
    _id: user._id,
    id: user.id,
    name: user.name,
    email: user.email,
    pictureUrl: user.pictureUrl
  };
  return token = jwt.sign(u, process.env.JWT_SECRET, {
    expiresIn: expiresIn
  });
}

const verifyToken = (token) => {
  try {
    var decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    throw new Error('Access denied');
  }
  return decoded;
}

module.exports = {
  generateToken,
  verifyToken
};