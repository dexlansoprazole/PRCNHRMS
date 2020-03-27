const mongoose = require('mongoose');
const ErrorHandler = require('../utils/error').ErrorHandler;
const Players = mongoose.model('players');

module.exports = (app) => {
  app.get(`/api/member`, async (req, res) => {
    let members = await Players.find().catch(err => {
      next(new ErrorHandler(400, err));
    });
    return res.status(200).send({members});
  });

  app.post(`/api/member/query`, async (req, res) => {
    let members = await Players.find(req.body).catch(err => {
      next(new ErrorHandler(400, err));
    });
    return res.status(200).send({members});
  });

  app.post(`/api/member`, async (req, res) => {
    player = await Players.create(req.body).catch(err => {
      next(new ErrorHandler(400, err));
    });
    return res.status(200).send({member: player})
  })

  app.patch(`/api/member/:id`, async (req, res) => {
    const {id} = req.params;
    player = await Players.findByIdAndUpdate(id, req.body, {new: true}).catch(err => {
      next(new ErrorHandler(400, err));
    });
    return res.status(200).send({member: player});
  });

  app.delete(`/api/member/:id`, async (req, res) => {
    const {id} = req.params;
    player = await Players.findByIdAndDelete(id).catch(err => {
      next(new ErrorHandler(400, err));
    });
    return res.status(200).send({member: player})
  })
}