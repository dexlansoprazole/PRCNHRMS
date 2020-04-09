const mongoose = require('mongoose');
const Users = mongoose.model('users');
const Teams = mongoose.model('teams');
const Players = mongoose.model('players');

const parseTeamLeader = async (team) => {
  return await {...(team.toObject ? team.toObject() : team), leader: await Users.findOne({_id: team.leader}, '_id name email pictureUrl')};
}

const parseTeamRequests = async (team) => {
  let requests = await Promise.all(team.requests.map(async r => await Users.findById(r, '_id name email pictureUrl')));
  return {...(team.toObject ? team.toObject() : team), requests};
}

const parseUserRequests = async (user) => {
  let requests = await Promise.all(user.requests.map(async r => await Teams.findById(r, '_id name leader managers requests')));
  requests = await Promise.all(requests.map(async r => await parseTeamLeader(r)));
  requests = requests.map(r => ({_id: r._id, name: r.name, users: {leader: r.leader, managers: r.managers, requests: r.requests}}));
  requests = await Promise.all(requests.map(async r => ({...r, members: await Players.find({team: r._id}, '_id')})));
  return {...(user.toObject ? user.toObject() : user), requests};
}

module.exports = {
  team: {
    leader: parseTeamLeader,
    requests: parseTeamRequests
  },
  user: {
    requests: parseUserRequests
  }
}