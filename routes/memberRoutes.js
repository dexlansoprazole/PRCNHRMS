const mongoose = require('mongoose');
const Players = mongoose.model('players');

module.exports = (app) => {

  app.get(`/api/member`, async (req, res) => {
    let members = await Players.find().catch(err => {
      return handleError(res, err)
    });
    return res.status(200).send(members);
  });

  app.post(`/api/member/query`, async (req, res) => {
    let members = await Players.find(req.body).catch(err => {
      return handleError(res, err)
    });
    return res.status(200).send(members);
  });

  app.post(`/api/member`, async (req, res) => {
    await Players.create(req.body).catch(err => {
      return handleError(res, err)
    });
    let members = await Players.find({team: req.body.team});
    return res.status(200).send(members)
  })

  app.patch(`/api/member/:id`, async (req, res) => {
    const {id} = req.params;
    player = await Players.findByIdAndUpdate(id, req.body, {new: true}).catch(err => {
      return handleError(res, err)
    });
    let members = await Players.find({team: player.team});
    return res.status(200).send(members);
  });

  app.delete(`/api/member/:id`, async (req, res) => {
    const {id} = req.params;
    await Players.findByIdAndDelete(id).catch(err => {
      return handleError(res, err)
    });
    let members = await Players.find({team: req.body.team});
    return res.status(200).send(members)
  })

  function handleError(res, err) {
    console.log("err: " + err);
    return res.status(400).send(err);
  }

}