const mongoose = require('mongoose');
const Teams = mongoose.model('teams');
const Players = mongoose.model('players');
const Users = mongoose.model('users');
const permission = require('../utils/permission');
const {PermissionError} = require('../utils/error');

module.exports = (app) => {
  app.post(`/api/team/query`, async (req, res, next) => {
    try {
      let user = req.session.user;
      if (!user)
        throw new PermissionError();
      let teams = await Teams.find({leader: user._id});
      teams = await Promise.all(teams.map(async t => ({...t.toObject(), leader: await Users.findOne({_id: t.leader}, '_id name email')})));  //get data of team leader
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
      team = {...team.toObject(), leader: await Users.findOne({_id: team.leader}, '_id name email')};  //get data of team leader
      return res.status(200).send({team})
    } catch (error) {
      next(error);
    }
  })

  app.post(`/api/team/requests/:id`, async (req, res, next) => {
    const team_id = req.params.id;
    const session = await Teams.startSession();
    session.startTransaction();
    try {
      let user = req.session.user;
      if (!user)
        throw new PermissionError();
      let team = await Teams.findByIdAndUpdate(team_id, {$push: {requests: user._id}}, {new: true}, {session});
      user = await Users.findByIdAndUpdate(user._id, {$push: {requests: team._id}}, {new: true}, {session});
      team = {...team.toObject(), leader: await Users.findOne({_id: team.leader}, '_id name email')};  //get data of team leader
      await session.commitTransaction();
      session.endSession();
      return res.status(200).send({ team })
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
      team = { ...team.toObject(), leader: await Users.findOne({ _id: team.leader }, '_id name email') };  //get data of team leader
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
      let members = await Players.find({team: _id}, '_id');
      if(members.length > 0)
        await Players.deleteMany({$or: members}, {session});
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