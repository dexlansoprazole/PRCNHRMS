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
  const userid = payload['sub'];
  const username = payload['name'];
  const email = payload['email'];
  return {
    id: userid,
    name: username,
    email: email
  }
}

module.exports = (app) => {
  app.post(`/api/user/query`, async (req, res) => {
    let users = await Users.find(req.body).catch(err => {
      return handleError(res, err)
    });
    return res.status(200).send(users);
  });

  app.post(`/api/user/login`, async (req, res) => {
    let user = await verify(req.body.token).catch(console.error);
    await Users.findOneAndUpdate({id: user.id}, {}, {upsert: true}).catch(err => {
      return handleError(res, err)
    });
    return res.status(200).send(user)
  })

  app.put(`/api/user/:id`, async (req, res) => {
    const {id} = req.params;
    await Users.findByIdAndUpdate(id, req.body).catch(err => {
      return handleError(res, err)
    });
    let users = await Users.find();
    return res.status(200).send(users)
  });

  app.delete(`/api/user/:id`, async (req, res) => {
    const {id} = req.params;
    await Users.findByIdAndDelete(id).catch(err => {
      return handleError(res, err)
    });
    let users = await Users.find();
    return res.status(200).send(users)
  })

  function handleError(res, err) {
    console.log("err: " + err);
    return res.status(400).send(err);
  }
}