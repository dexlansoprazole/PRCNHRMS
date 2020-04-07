const mongoose = require('mongoose');
const {OAuth2Client} = require('google-auth-library');
const Users = mongoose.model('users');
const Teams = mongoose.model('teams');

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
      let token = req.body.token
      let user = null;
      if (token) {
        user = await verify(req.body.token);
        user = await Users.findOneAndUpdate({id: user.id}, user, {upsert: true, new: true});
        req.session.user = user;

        let requests = await Promise.all(user.requests.map(async r => await Teams.findById(r, '_id name leader managers requests')));
        requests = await Promise.all(requests.map(async r => ({...r.toObject(), leader: await Users.findOne({_id: r.leader}, '_id name email')})));
        user = {...user.toObject(), requests};
      }
      else if (req.session.user) {
        user = await Users.findOne({id: req.session.user.id});
        req.session.user = user;

        let requests = await Promise.all(user.requests.map(async r => await Teams.findById(r, '_id name leader managers requests')));
        requests = await Promise.all(requests.map(async r => ({...r.toObject(), leader: await Users.findOne({_id: r.leader}, '_id name email')})));
        user = {...user.toObject(), requests};
      }
      return res.status(200).send({user})
    } catch (error) {
      next(error);
    }
  })

  app.post(`/api/auth/signout`, async (req, res, next) => {
    try {
      if (req.session)
        req.session.destroy();
      return res.status(200).send({error: false})
    } catch (error) {
      next(error);
    }
  })
}