const mongoose = require('mongoose');
const Members = mongoose.model('members');

module.exports = (app) => {

  app.get(`/api/member`, async (req, res) => {
    let members = await Members.find();
    return res.status(200).send(members);
  });

  app.post(`/api/member/query`, async (req, res) => {
    let members = await Members.find(req.body);
    return res.status(200).send(members);
  });

  app.post(`/api/member`, async (req, res) => {
    let members = await Members.create(req.body);
    return res.status(201).send({
      error: false,
      members
    })
  })

  app.put(`/api/member/:id`, async (req, res) => {
    const {id} = req.params;
    let member = await Members.findByIdAndUpdate(id, req.body);
    return res.status(202).send({
      error: false,
      member
    })
  });

  app.patch(`/api/member/:id`, async (req, res) => {
    const {id} = req.params;
    
    let member = await Members.findByIdAndUpdate(id, req.body);
    return res.status(202).send({
      error: false,
      member
    })
  });

  app.delete(`/api/member/:id`, async (req, res) => {
    const {id} = req.params;
    let member = await Members.findByIdAndDelete(id);
    return res.status(202).send({
      error: false,
      member
    })
  })

}