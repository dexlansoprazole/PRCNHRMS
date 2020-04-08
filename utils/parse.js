const mongoose = require('mongoose');
const Users = mongoose.model('users');
const Teams = mongoose.model('teams');

const parseTeamLeader = async (team) => {
  return await {...team.toObject(), leader: await Users.findOne({_id: team.leader}, '_id name email')};
}

const parseUserRequests = async (user) => {
  let requests = await Promise.all(user.requests.map(async r => await Teams.findById(r, '_id name leader managers requests')));
  requests = await Promise.all(requests.map(async r => await parseTeamLeader(r)));
  return {...user.toObject(), requests};
}

module.exports = {
  team: {
    leader: parseTeamLeader
  },
  user: {
    requests: parseUserRequests
  }
}