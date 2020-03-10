const mongoose = require('mongoose');
const Members = mongoose.model('members');

module.exports = (app) => {

  app.get(`/api/member`, async (req, res) => {
    let members = await Members.find().catch(err => {
      return handleError(res, err)
    });
    return res.status(200).send(members);
  });

  app.post(`/api/member/query`, async (req, res) => {
    let members = await Members.find(req.body).catch(err => {
      return handleError(res, err)
    });
    return res.status(200).send(members);
  });

  app.post(`/api/member`, async (req, res) => {
    await Members.create(req.body).catch(err => {
      return handleError(res, err)
    });
    let members = await Members.find();
    return res.status(200).send(members)
  })

  app.put(`/api/member/:id`, async (req, res) => {
    const {id} = req.params;
    await Members.findByIdAndUpdate(id, req.body).catch(err => {
      return handleError(res, err)
    });
    let members = await Members.find();
    return res.status(200).send(members)
  });

  app.patch(`/api/member/:id`, async (req, res) => {
    const {id} = req.params;
    await Members.findByIdAndUpdate(id, req.body).catch(err => {
      return handleError(res, err)
    });
    let members = await Members.find();
    return res.status(200).send(members);
  });

  app.delete(`/api/member/:id`, async (req, res) => {
    const {id} = req.params;
    await Members.findByIdAndDelete(id).catch(err => {
      return handleError(res, err)
    });
    let members = await Members.find();
    return res.status(200).send(members)
  })

  function handleError(res, err) {
    console.log("err: " + err);
    return res.status(400).send(err);
  }

}