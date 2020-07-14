const mongoose = require('mongoose');
const Users = mongoose.model('users');
const Teams = mongoose.model('teams');
const {PermissionError} = require('../utils/error');
const parse = require('../utils/parse');
const wrap = require('../utils/wrap');

module.exports = (app) => {
  // app.post(`/api/user/query`, async (req, res, next) => {
  //   let users = await Users.find(req.body).catch(err => {
  //     next(err);
  //   });
  //   return res.status(200).send({users});
  // });

  app.patch(`/api/user/`, async (req, res, next) => {
    const data = Object.filter(req.body, ['name', 'teamSelected']);
    try {
      if (!req.session.user)
        throw new PermissionError();
      let teams = await Teams.find({$or: [{leader: req.session.user._id}, {managers: {$in: [req.session.user._id]}}, {members: {$in: [req.session.user._id]}}]}, '-__v');
      if (data.teamSelected && !teams.map(t => t._id).find(id => id.toString() === data.teamSelected))
        throw new PermissionError();
      
      let user = await Users.findByIdAndUpdate(req.session.user._id, data, {new: true, select: '-__v'});
      user = await parse.user.requests(user);
      teams = await Promise.all(teams.map(async t => await parse.team.leader(t)));
      teams = await Promise.all(teams.map(async t => await parse.team.requests(t)));
      teams = await Promise.all(teams.map(async t => await parse.team.members(t)));
      teams = await Promise.all(teams.map(async t => await wrap.team(t, true)));
      return res.status(200).send({user, teamSelected: user.teamSelected, teams})
    } catch (error) {
      next(error);
    }
  });

  // app.delete(`/api/user/:id`, async (req, res, next) => {
  //   const {id} = req.params;
  //   await Users.findByIdAndDelete(id).catch(err => {
  //     next(err);
  //   });
  //   let users = await Users.find();
  //   return res.status(200).send({users})
  // })
}