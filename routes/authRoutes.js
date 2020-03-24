const mongoose = require('mongoose');
const {OAuth2Client} = require('google-auth-library');
const Users = mongoose.model('users');
const generateToken = require('../utils/generateToken');

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
  return {
    id,
    name,
    email
  }
}

module.exports = (app) => {
  app.post(`/api/auth/signin`, async (req, res) => {
    console.log(req.cookies);
    
    let user = await verify(req.body.token).catch(console.error);
    user = await Users.findOneAndUpdate({id: user.id}, user, {upsert: true, new: true}).catch(err => {
      return handleError(res, err)
    });
    let expiresIn = 60 * 60 * 24;
    let token = generateToken({_id: user._id, id: user.id, name: user.name, email: user.email}, expiresIn);
    res.cookie('token', token, {maxAge: 900000, httpOnly: true});
    res.cookie('expires_in', expiresIn, {maxAge: 900000, httpOnly: true});
    return res.status(200).send({user})
  })

  function handleError(res, err) {
    console.log("err: " + err);
    return res.status(400).send(err);
  }
}