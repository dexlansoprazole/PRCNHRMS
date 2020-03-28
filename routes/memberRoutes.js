const mongoose = require('mongoose');
const { PermissionError } = require('../utils/error');
const Players = mongoose.model('players');
const Teams = mongoose.model('teams');
const { verifyToken } = require('../utils/token');

module.exports = (app) => {
  const isLeader = async (token, team_id) => {
    const decoded = verifyToken(token);
    const teams = await Teams.find({leader: decoded._id}).catch(err => {
      throw err;
    });
    return teams.find(t => t._id.toString() === team_id) ? true : false;
  }

  app.post(`/api/member/query`, async (req, res, next) => {
    try {
      req.body.forEach(q => {
        if (!isLeader(req.cookies.token, q.team))
          throw new PermissionError();
      });
      let members = await Players.find({$or: req.body});
      return res.status(200).send({members});
    } catch (error) {
      next(err);
    }
  });

  app.post(`/api/member`, async (req, res, next) => {
    try {
      if (!isLeader(req.cookies.token, req.body.team))
        throw new PermissionError();
      const player = await Players.create(req.body)
      return res.status(200).send({member: player})
    } catch (error) {
      next(error);
    }
  })

  app.patch(`/api/member/:id`, async (req, res, next) => {
    const {id} = req.params;
    try {
      let player = await Players.findOne({_id: id});
      if (req.body.team)
        throw new PermissionError();
      if (!isLeader(req.cookies.token, player.team.toString()))
        throw new PermissionError();
      player = await Players.findByIdAndUpdate(id, req.body, {new: true});
      return res.status(200).send({member: player});
    } catch (error) {
      next(error);
    }
  });

  app.delete(`/api/member/:id`, async (req, res, next) => {
    const {id} = req.params;
    try {
      let player = await Players.findOne({_id: id});
      if (!isLeader(req.cookies.token, player.team.toString()))
        throw new PermissionError();
      player = await Players.findByIdAndDelete(id)
      return res.status(200).send({member: player})
    } catch (error) {
      next(error);
    }
  })
}