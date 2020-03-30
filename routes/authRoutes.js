const mongoose = require('mongoose');
const {OAuth2Client} = require('google-auth-library');
const Users = mongoose.model('users');
const {generateToken} = require('../utils/token');

const CLIENT_ID = process.env.CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);
async function verify(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID,
  });
  const payload = ticket.getPayload();
  const id = payload['sub'];
  const name = payload['name'];
  const email = payload['email'];
  const pictureUrl = payload['picture'];
  return {
    id,
    name,
    email,
    pictureUrl
  }
}

module.exports = (app) => {
  app.post(`/api/auth/signin`, async (req, res, next) => {
    try {
      let user = await verify(req.body.token);
      user = await Users.findOneAndUpdate({id: user.id}, user, {upsert: true, new: true});
      let expiresIn = 60 * 60 * 24;
      let token = generateToken({_id: user._id, id: user.id, name: user.name, email: user.email, pictureUrl: user.pictureUrl}, expiresIn);
      res.cookie('token', token, {maxAge: 86400000, httpOnly: true});
      return res.status(200).send({user})
    } catch (error) {
      next(error);
    }
  })
}