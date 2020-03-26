const mongoose = require('mongoose');
const Teams = mongoose.model('teams');
const Players = mongoose.model('players');
const Users = mongoose.model('users');

module.exports = (app) => {
  app.post(`/api/team/query`, async (req, res) => {
    try {
      let teams = await Teams.find(req.body);
      teams = await Promise.all(teams.map(async t => ({...t.toObject(), leader: await Users.findOne({_id: t.leader}, '_id email')})));  //get data of team leader
      return res.status(200).send({teams});
    } catch (error) {
      return handleError(res, error)
    }
  });

  app.post(`/api/team/`, async (req, res) => {
    let team = await Teams.create(req.body).catch(err => {
      return handleError(res, err)
    });
    team = {...team.toObject(), leader: await Users.findOne({_id: team.leader}, '_id email')};  //get data of team leader
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
    const session = await Teams.startSession();
    session.startTransaction();
    try {
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
      return handleError(res, error)
    }
  })

  function handleError(res, err) {
    console.log("err: " + err);
    return res.status(400).send(err);
  }
}