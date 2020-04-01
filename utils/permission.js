const mongoose = require('mongoose');
const Teams = mongoose.model('teams');
const {PermissionError} = require('./error');

const checkIsLeader = async (user, team_id) => {
  const teams = await Teams.find({leader: user._id}).catch(err => {
    Promise.reject(err);
  });
  if (teams.find(t => t._id.toString() === team_id))
    return true;
  Promise.reject(new PermissionError());
}

module.exports = {
  checkIsLeader
}