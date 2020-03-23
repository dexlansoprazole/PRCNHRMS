const mongoose = require('mongoose');
const Teams = mongoose.model('teams');

module.exports = (app) => {
  app.post(`/api/team/query`, async (req, res) => {
    let teams = await Teams.find(req.body).catch(err => {
      return handleError(res, err)
    });
    return res.status(200).send({teams});
  });

  app.post(`/api/team/`, async (req, res) => {
    let team = await Teams.create(req.body).catch(err => {
      return handleError(res, err)
    });
    return res.status(200).send({teams: team})
  })

  app.put(`/api/team/:id`, async (req, res) => {
    const {id} = req.params;
    await Teams.findByIdAndUpdate(id, req.body).catch(err => {
      return handleError(res, err)
    });
    let teams = await Teams.find();
    return res.status(200).send({teams})
  });

  app.delete(`/api/team/:id`, async (req, res) => {
    const {id} = req.params;
    await Teams.findByIdAndDelete(id).catch(err => {
      return handleError(res, err)
    });
    let teams = await Teams.find();
    return res.status(200).send({teams})
  })

  function handleError(res, err) {
    console.log("err: " + err);
    return res.status(400).send(err);
  }
}