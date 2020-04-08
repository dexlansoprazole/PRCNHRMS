const mongoose = require('mongoose');
const Teams = mongoose.model('teams');
const Players = mongoose.model('players');
const Users = mongoose.model('users');
const permission = require('../utils/permission');
const {PermissionError} = require('../utils/error');
const parse = require('../utils/parse');
const wrap = require('../utils/wrap');

module.exports = (app) => {
  app.post(`/api/team/query`, async (req, res, next) => {
    query = Object.filter(req.body, ['name']);
    try {
      let user = req.session.user;
      if (!user)
        throw new PermissionError();
      let teams = await Teams.find(Object.keys(query).length > 0 ? {name: new RegExp('^\\S*' + query.name + '\\S*$', "i")} : {leader: user._id});
      teams = await Promise.all(teams.map(async t => await parse.team.leader(t)));
      teams = await Promise.all(teams.map(async t => await wrap.team(t)));
      return res.status(200).send({teams});
    } catch (error) {
      next(error);
    }
  });

  app.post(`/api/team/`, async (req, res, next) => {
    const newTeam = Object.filter(req.body, ['name', 'leader']);
    try {
      if (!req.session.user)
        throw new PermissionError();
      let team = await Teams.create(newTeam);
      team = await parse.team.leader(team);
      team = await wrap.team(team);
      return res.status(200).send({team})
    } catch (error) {
      next(error);
    }
  })

  app.post(`/api/team/request/:id`, async (req, res, next) => {
    const team_id = req.params.id;
    const session = await Teams.startSession();
    session.startTransaction();
    try {
      let user = req.session.user;
      if (!user)
        throw new PermissionError();
      let team = await Teams.findByIdAndUpdate(team_id, {$addToSet: {requests: user._id}}, {new: true, session});
      user = await Users.findByIdAndUpdate(user._id, {$addToSet: {requests: team._id}}, {new: true, session});
      await session.commitTransaction();
      session.endSession();
      user = await parse.user.requests(user);
      team = await parse.team.leader(team);
      team = await wrap.team(team);
      return res.status(200).send({ user, team })
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      next(error);
    }
  });

  app.delete(`/api/team/request/:id`, async (req, res, next) => {
    const team_id = req.params.id;
    const session = await Teams.startSession();
    session.startTransaction();
    try {
      let user = req.session.user;
      if (!user)
        throw new PermissionError();
      let team = await Teams.findByIdAndUpdate(team_id, {$pull: {requests: user._id}}, {new: true, session});
      user = await Users.findByIdAndUpdate(user._id, {$pull: {requests: team._id}}, {new: true, session});
      await session.commitTransaction();
      session.endSession();
      user = await parse.user.requests(user);
      team = await parse.team.leader(team);
      team = await wrap.team(team);
      return res.status(200).send({ user, team })
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      next(error);
    }
  });

  app.patch(`/api/team/:id`, async (req, res, next) => {
    const _id = req.params.id;
    const data = Object.filter(req.body, ['name', 'managers', 'leader']);
    try {
      await permission.checkIsLeader(req.session.user, _id);
      let team = await Teams.findByIdAndUpdate(_id, data, {new: true});
      team = await parse.team.leader(team);
      team = await wrap.team(team);
      return res.status(200).send({team})
    } catch (error) {
      next(error);
    }
  });

  app.delete(`/api/team/:id`, async (req, res, next) => {
    const _id = req.params.id;
    const session = await Teams.startSession();
    session.startTransaction();
    try {
      await permission.checkIsLeader(req.session.user, _id);
      let team = await Teams.findByIdAndDelete(_id, {session});

      // Delete members of deleted team
      let members = await Players.find({team: _id}, '_id');
      if (members.length > 0)
        await Players.deleteMany({$or: members}, {session});
      
      // Pull requests for deleted team
      let or = team.requests.map(r => ({_id: r}));
      if (or.length > 0)
        await Users.updateMany({$or: or}, {$pull: {requests: team._id}}, {session});
      
      await session.commitTransaction();
      session.endSession();
      return res.status(200).send({team, members});
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      next(error);
    }
  })
}