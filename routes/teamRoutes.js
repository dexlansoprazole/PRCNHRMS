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

  app.patch(`/api/team/request/add`, async (req, res, next) => {
    const {team_id} = Object.filter(req.body, ['team_id']);
    try {
      let user = req.session.user;
      if (!user)
        throw new PermissionError();
      let team = await Teams.findByIdAndUpdate(team_id, {$addToSet: {requests: user._id}}, {new: true});
      user = await parse.user.requests(user);
      user = await parse.user.teamSelected(user);
      team = await parse.team.leader(team);
      team = await parse.team.members(team);
      team = await parse.team.requests(team);
      team = await wrap.team(team);
      return res.status(200).send({user, team})
    } catch (error) {
      next(error);
    }
  });

  app.patch(`/api/team/request/delete`, async (req, res, next) => {
    const data = Object.filter(req.body, ['team_id', 'user_id']);
    const team_id = data.team_id;
    try {
      let user = req.session.user;
      if (!user)
        throw new PermissionError();
      let user_id = user._id;
      if (data.user_id) {
        await permission.checkIsLeader(user, team_id);
        user_id = data.user_id;
      }

      let team = await Teams.findByIdAndUpdate(team_id, {$pull: {requests: user_id}}, {new: true});
      user = await parse.user.requests(user);
      user = await parse.user.teamSelected(user);
      team = await parse.team.leader(team);
      team = await parse.team.members(team);
      team = await parse.team.requests(team);
      team = await wrap.team(team, data.user_id != null);
      return res.status(200).send({user, team})
    } catch (error) {
      next(error);
    }
  });

  app.patch(`/api/team/member/add`, async (req, res, next) => {
    const {team_id, user_id} = Object.filter(req.body, ['team_id', 'user_id']);
    try {
      await permission.checkIsLeader(req.session.user, team_id);
      let isRequesting = (await Teams.findById(team_id, 'requests')).requests.includes(user_id);
      if (!isRequesting)
        throw new PermissionError();
      let team = await Teams.findByIdAndUpdate(team_id, {$addToSet: {members: user_id}, $pull: {requests: user_id}}, {new: true});
      team = await parse.team.leader(team);
      team = await parse.team.members(team);
      team = await parse.team.requests(team);
      team = await wrap.team(team, true);
      return res.status(200).send({team})
    } catch (error) {
      next(error);
    }
  });

  app.patch(`/api/team/member/delete`, async (req, res, next) => {
    const {team_id, user_id} = Object.filter(req.body, ['team_id', 'user_id']);
    try {
      await permission.checkIsLeader(req.session.user, team_id);
      let team = await Teams.findByIdAndUpdate(team_id, {$pull: {members: user_id}}, {new: true});
      team = await parse.team.leader(team);
      team = await parse.team.members(team);
      team = await parse.team.requests(team);
      team = await wrap.team(team, true);
      // TODO: Update teamSelected if deleted
      return res.status(200).send({team})
    } catch (error) {
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
      team = await parse.team.members(team);
      team = await parse.team.requests(team);
      team = await wrap.team(team, true);
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

      // Update teamSelected if deleted
      let user = await Users.findById(req.session.user._id).session(session);
      let newTeamSelected = null;
      if (user.teamSelected.toString() === team._id.toString()) {
        let teams = await Teams.find({$or: [{leader: user._id}, {managers: {$in: [user._id]}}, {members: {$in: [user._id]}}]}, '-__v').session(session);
        if (teams.length > 0) {
          newTeamSelected = await parse.team.leader(teams[0]);
          newTeamSelected = await parse.team.requests(newTeamSelected);
          newTeamSelected = await parse.team.members(newTeamSelected);
          newTeamSelected = await wrap.team(newTeamSelected, true);
          user.teamSelected = newTeamSelected._id;
        }
        else
          user.teamSelected = null; 
      }
      else
        newTeamSelected = user.teamSelected.toString();
      await user.save();
      await session.commitTransaction();
      session.endSession();
      return res.status(200).send({team, members, teamSelected: newTeamSelected});
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      next(error);
    }
  })
}