const mongoose = require('mongoose');
const Users = mongoose.model('users');

module.exports = (app) => {
  app.post(`/api/user/query`, async (req, res, next) => {
    let users = await Users.find(req.body).catch(err => {
      next(err);
    });
    return res.status(200).send({users});
  });

  app.patch(`/api/user/:id`, async (req, res, next) => {
    const {id} = req.params;
    let user = await Users.findByIdAndUpdate(id, req.body, {new: true}).catch(err => {
      next(err);
    });
    return res.status(200).send({user})
  });

  app.delete(`/api/user/:id`, async (req, res, next) => {
    const {id} = req.params;
    await Users.findByIdAndDelete(id).catch(err => {
      next(err);
    });
    let users = await Users.find();
    return res.status(200).send({users})
  })
}