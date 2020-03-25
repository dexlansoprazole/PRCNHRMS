const mongoose = require('mongoose');
const Teams = mongoose.model('teams');
const Players = mongoose.model('players');

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
    return res.status(200).send({team})
  })

  app.patch(`/api/team/:id`, async (req, res) => {
    const id = req.params;
    let team = await Teams.findByIdAndUpdate(id, req.body, {new: true}).catch(err => {
      return handleError(res, err)
    });
    return res.status(200).send({team})
  });

  app.delete(`/api/team/:id`, async (req, res) => {
    const {id} = req.params;
    try {
      let team = await Teams.findByIdAndDelete(id);
      let members = await Players.find({team: id}, '_id');
      if(members.length > 0)
        await Players.deleteMany({$or: members});
      return res.status(200).send({team, members});
    } catch (error) {
      return handleError(res, error)
    }
  })

  function handleError(res, err) {
    console.log("err: " + err);
    return res.status(400).send(err);
  }
}