const mongoose = require('mongoose');
const {OAuth2Client} = require('google-auth-library');
const Users = mongoose.model('users');

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
  app.post(`/api/user/query`, async (req, res) => {
    let users = await Users.find(req.body).catch(err => {
      return handleError(res, err)
    });
    return res.status(200).send({users});
  });

  app.patch(`/api/user/:id`, async (req, res) => {
    const {id} = req.params;
    let user = await Users.findByIdAndUpdate(id, req.body, {new: true}).catch(err => {
      return handleError(res, err)
    });
    return res.status(200).send({user})
  });

  app.delete(`/api/user/:id`, async (req, res) => {
    const {id} = req.params;
    await Users.findByIdAndDelete(id).catch(err => {
      return handleError(res, err)
    });
    let users = await Users.find();
    return res.status(200).send({users})
  })

  function handleError(res, err) {
    console.log("err: " + err);
    return res.status(400).send(err);
  }
}