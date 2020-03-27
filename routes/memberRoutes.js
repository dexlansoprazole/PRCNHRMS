const mongoose = require('mongoose');
const { PermissionError } = require('../utils/error');
const Players = mongoose.model('players');
const Teams = mongoose.model('teams');
const { verifyToken } = require('../utils/token');

module.exports = (app) => {
  app.post(`/api/member/query`, async (req, res, next) => {
    let members = await Players.find(req.body).catch(err => {
      next(err);
    });
    return res.status(200).send({members});
  });

  app.post(`/api/member`, async (req, res, next) => {
    try {
      const decoded = verifyToken(req.cookies.token);
      const team = await Teams.findOne({leader: decoded._id});
      if (!team || team._id.toString() !== req.body.team)
        throw new PermissionError();
      const player = await Players.create(req.body)
      return res.status(200).send({member: player})
    } catch (error) {
      next(error);
    }
  })

  app.patch(`/api/member/:id`, async (req, res, next) => {
    const {id} = req.params;
    player = await Players.findByIdAndUpdate(id, req.body, {new: true}).catch(err => {
      next(err);
    });
    return res.status(200).send({member: player});
  });

  app.delete(`/api/member/:id`, async (req, res, next) => {
    const {id} = req.params;
    player = await Players.findByIdAndDelete(id).catch(err => {
      next(err);
    });
    return res.status(200).send({member: player})
  })
}