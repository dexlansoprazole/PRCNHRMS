const mongoose = require('mongoose');
const Teams = mongoose.model('teams');
const {verifyToken} = require('../utils/token');
const {PermissionError} = require('./error');

const checkIsLeader = async (token, team_id) => {
  const decoded = verifyToken(token);
  const teams = await Teams.find({leader: decoded._id}).catch(err => {
    Promise.reject(err);
  });
  if (teams.find(t => t._id.toString() === team_id))
    return true;
  Promise.reject(new PermissionError());
}

module.exports = {
  checkIsLeader
}