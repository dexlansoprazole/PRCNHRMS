const jwt = require('jsonwebtoken');

const generateToken = (user, expiresIn) => {
  var u = {
    _id: user._id,
    id: user.id,
    name: user.name,
    email: user.email
  };
  return token = jwt.sign(u, process.env.JWT_SECRET, {
    expiresIn: expiresIn
  });
}

module.exports = generateToken;