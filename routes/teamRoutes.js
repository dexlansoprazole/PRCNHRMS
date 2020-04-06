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
    try {
      if (!req.session.user)
        throw new PermissionError();
      let team = await Teams.create(req.body);
      team = {...team.toObject(), leader: await Users.findOne({_id: team.leader}, '_id name email')};  //get data of team leader
      return res.status(200).send({team})
    } catch (error) {
      next(error);
    }
  })

  app.patch(`/api/team/:id`, async (req, res, next) => {
    const {id} = req.params;
    const data = {name, managers, leader} = req.body;
    try {
      await permission.checkIsLeader(req.session.user, id);
      let team = await Teams.findByIdAndUpdate(id, data, {new: true});
      team = { ...team.toObject(), leader: await Users.findOne({ _id: team.leader }, '_id name email') };  //get data of team leader
      return res.status(200).send({team})
    } catch (error) {
      next(error);
    }
  });

  app.delete(`/api/team/:id`, async (req, res, next) => {
    const {id} = req.params;
    const session = await Teams.startSession();
    session.startTransaction();
    try {
      await permission.checkIsLeader(req.session.user, id);
      let team = await Teams.findByIdAndDelete(id, {session});
      let members = await Players.find({team: id}, '_id');
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