const mongoose = require('mongoose');
const Teams = mongoose.model('teams');
const {PermissionError} = require('./error');

const checkIsLeader = async (user, team_id) => {
  if (user) {
    try {
      const team = await Teams.find({_id: team_id, leader: user._id});
      if (team != null && team.length > 0)
        return true;
    } catch (error) {
      await Promise.reject(err);
    }
  }
  await Promise.reject(new PermissionError());
}

const checkIsMember = async (user, team_id) => {
  if (user) {
    try {
      const team = await Teams.find({_id: team_id, $or: [{leader: user._id}, {members: {$in: [user._id]}}]});
      if (team != null && team.length > 0)
        return true;
    } catch (error) {
      await Promise.reject(err);
    }
  }
  await Promise.reject(new PermissionError());
}

module.exports = {
  checkIsLeader,
  checkIsMember
}