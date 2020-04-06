const mongoose = require('mongoose');
const { PermissionError } = require('../utils/error');
const Players = mongoose.model('players');
const permission = require('../utils/permission');

module.exports = (app) => {
  app.post(`/api/member/query`, async (req, res, next) => {
    try {
      for (q of req.body)
        await permission.checkIsLeader(req.session.user, q.team);
      let members = await Players.find({$or: req.body.map(q => Object.filter(q, ['team']))});
      return res.status(200).send({members});
    } catch (error) {
      next(err);
    }
  });

  app.post(`/api/member`, async (req, res, next) => {
    const newMember = Object.filter(req.body, ['id', 'name', 'join_date', 'team']);
    try {
      await permission.checkIsLeader(req.session.user, newMember.team);
      const player = await Players.create(newMember)
      return res.status(200).send({member: player})
    } catch (error) {
      next(error);
    }
  })

  app.patch(`/api/member/:id`, async (req, res, next) => {
    const _id = req.params.id;
    const data = Object.filter(req.body, ['id', 'name', 'join_date', 'leave_date', 'kick_reason']);
    try {
      let player = await Players.findOne({ _id: _id});
      await permission.checkIsLeader(req.session.user, player.team.toString());
      player = await Players.findByIdAndUpdate(_id, data, {new: true});
      return res.status(200).send({member: player});
    } catch (error) {
      next(error);
    }
  });

  app.delete(`/api/member/:id`, async (req, res, next) => {
    const _id = req.params.id;
    try {
      let player = await Players.findOne({ _id: _id});
      await permission.checkIsLeader(req.session.user, player.team.toString());
      player = await Players.findByIdAndDelete(_id)
      return res.status(200).send({member: player})
    } catch (error) {
      next(error);
    }
  })
}