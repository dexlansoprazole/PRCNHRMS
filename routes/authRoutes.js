const mongoose = require('mongoose');
const {OAuth2Client} = require('google-auth-library');
const Users = mongoose.model('users');
const Teams = mongoose.model('teams');
const parse = require('../utils/parse');
const wrap = require('../utils/wrap');

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);
async function verify(token) {
  if (!CLIENT_ID)
    throw Error('google api client id is undefined');
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
      let teams = null;
      if (token) {
        user = await verify(req.body.token);
        let dbUser = await Users.findOne({id: user.id}, '-__v');
        if (!dbUser)
          user = await Users.create({...user, teamSelected: null});
        else {
          dbUser.email = user.email;
          dbUser.pictureUrl = user.pictureUrl;
          await dbUser.save();
          user = dbUser;
        }
      }
      else if (req.session.user) {
        user = await Users.findOne({id: req.session.user.id}, '-__v');
      }
      if (user) {
        req.session.user = user;
        user = await parse.user.requests(user);
        teams = await Teams.find({$or: [{leader: user._id}, {managers: {$in: [user._id]}}, {members: {$in: [user._id]}}]}, '-__v');
        teams = await Promise.all(teams.map(async t => await parse.team.leader(t)));
        teams = await Promise.all(teams.map(async t => await parse.team.requests(t)));
        teams = await Promise.all(teams.map(async t => await parse.team.members(t)));
        teams = await Promise.all(teams.map(async t => await wrap.team(t, true)));
      }
      return res.status(200).send({user, teams, teamSelected: user ? user.teamSelected : null})
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