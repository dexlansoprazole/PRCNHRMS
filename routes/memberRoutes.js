const mongoose = require('mongoose');
const { PermissionError } = require('../utils/error');
const Players = mongoose.model('players');
const permission = require('../utils/permission');

module.exports = (app) => {
  app.post(`/api/member/query`, async (req, res, next) => {
    try {
      for (q of req.body)
        await permission.checkIsLeader(req.cookies.token, q.team);
      let members = await Players.find({$or: req.body});
      return res.status(200).send({members});
    } catch (error) {
      next(err);
    }
  });

  app.post(`/api/member`, async (req, res, next) => {
    try {
      await permission.checkIsLeader(req.cookies.token, req.body.team);
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
      await permission.checkIsLeader(req.cookies.token, player.team.toString());
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
      await permission.checkIsLeader(req.cookies.token, player.team.toString());
      player = await Players.findByIdAndDelete(id)
      return res.status(200).send({member: player})
    } catch (error) {
      next(error);
    }
  })
}