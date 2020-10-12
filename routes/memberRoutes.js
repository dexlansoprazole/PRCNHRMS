const mongoose = require('mongoose');
const {PermissionError} = require('../utils/error');
const Players = mongoose.model('players');
const permission = require('../utils/permission');

module.exports = (app) => {
  app.post(`/api/member/query`, async (req, res, next) => {
    try {
      for (q of req.body)
        await permission.checkIsLeader(req.session.user, q.team);
      let members = await Players.find({$or: req.body.map(q => Object.filter(q, ['team']))}, {select: '-__v'});
      return res.status(200).send({members});
    } catch (error) {
      next(err);
    }
  });

  app.post(`/api/member`, async (req, res, next) => {
    const newMember = Object.filter(req.body, ['id', 'name', 'join_date', 'leave_date', 'kick_reason', 'team', 'attendance']);
    try {
      await permission.checkIsLeader(req.session.user, newMember.team);
      const player = await Players.create(newMember)
      return res.status(200).send({member: player})
    } catch (error) {
      next(error);
    }
  })

  app.patch(`/api/member/upvote_attendance/:id`, async (req, res, next) => {
    const player_id = req.params.id;
    const date = req.body.date;
    try {
      let user = req.session.user;
      if (!user)
        throw new PermissionError();
      const data = {user_id: user._id, date: date};
      let player = await Players.findById(player_id);
      const voted = player.upvote_attendance.find(v => v.user_id === user._id && v.date === date);
      player = voted ?
        await Players.findByIdAndUpdate(player_id, {$pull: {upvote_attendance: {user_id: data.user_id, date: date}}}, {new: true, select: '-__v'}) :
        await Players.findByIdAndUpdate(player_id, {$addToSet: {upvote_attendance: data}}, {new: true, select: '-__v'});
      return res.status(200).send({member: player});
    } catch (error) {
      next(error);
    }
  })

  app.patch(`/api/member/downvote_attendance/:id`, async (req, res, next) => {
    const player_id = req.params.id;
    const date = req.body.date;
    try {
      let user = req.session.user;
      if (!user)
        throw new PermissionError();
      const data = {user_id: user._id, date: date};
      let player = await Players.findById(player_id);
      const voted = player.downvote_attendance.find(v => v.user_id === user._id && v.date === date);
      player = voted ?
        await Players.findByIdAndUpdate(player_id, {$pull: {downvote_attendance: {user_id: data.user_id, date: date}}}, {new: true, select: '-__v'}) :
        await Players.findByIdAndUpdate(player_id, {$addToSet: {downvote_attendance: data}}, {new: true, select: '-__v'});
      return res.status(200).send({member: player});
    } catch (error) {
      next(error);
    }
  })

  app.patch(`/api/member/:id`, async (req, res, next) => {
    const player_id = req.params.id;
    const data = Object.filter(req.body, ['id', 'name', 'join_date', 'leave_date', 'kick_reason', 'attendance']);
    try {
      let player = await Players.findById(player_id);
      await permission.checkIsLeader(req.session.user, player.team.toString());
      player = await Players.findByIdAndUpdate(player_id, data, {new: true, select: '-__v'});
      return res.status(200).send({member: player});
    } catch (error) {
      next(error);
    }
  });

  app.patch(`/api/member`, async (req, res, next) => {
    const datas = req.body.map(d => Object.filter(d, ['_id', 'id', 'name', 'join_date', 'leave_date', 'kick_reason', 'attendance']));
    try {
      let players = await Players.find({_id: {$in: datas.map(d => d._id)}});
      players.forEach(async player => {
        await permission.checkIsLeader(req.session.user, player.team.toString());
      });
      let result = await Players.bulkWrite(
        datas.map(data => ({
          updateOne: {
            filter: {_id: data._id},
            update: {$set: data}
          }
        }))
      );
      return res.status(200).send({result: result.result});
    } catch (error) {
      next(error);
    }
  });

  app.delete(`/api/member/:id`, async (req, res, next) => {
    const player_id = req.params.id;
    try {
      let player = await Players.findById(player_id);
      await permission.checkIsLeader(req.session.user, player.team.toString());
      player = await Players.findByIdAndDelete(player_id, {select: '-__v'})
      return res.status(200).send({member: player})
    } catch (error) {
      next(error);
    }
  })
}