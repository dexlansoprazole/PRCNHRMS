const mongoose = require('mongoose');
const Users = mongoose.model('users');
const Teams = mongoose.model('teams');
const Players = mongoose.model('players');
const wrap = require('./wrap');

const parseTeamLeader = async (team) => {
  return await {...(team.toObject ? team.toObject() : team), leader: await Users.findOne({_id: team.leader}, '_id name email pictureUrl')};
}

const parseTeamRequests = async (team) => {
  let requests = await Promise.all(team.requests.map(async r => await Users.findById(r, '_id name email pictureUrl')));
  return {...(team.toObject ? team.toObject() : team), requests};
}

const parseTeamMembers = async (team) => {
  let members = await Promise.all(team.members.map(async r => await Users.findById(r, '_id name email pictureUrl')));
  return {...(team.toObject ? team.toObject() : team), members};
}

const parseUserRequests = async (user) => {
  let requests = await Teams.find({requests: {$in: [user._id]}}, '_id name leader managers members requests');
  requests = await Promise.all(requests.map(async r => await parseTeamLeader(r)));
  requests = requests.map(r => ({_id: r._id, name: r.name, users: {leader: r.leader, managers: r.managers, members: r.members, requests: r.requests}}));
  requests = await Promise.all(requests.map(async r => ({...r, members: await Players.find({team: r._id, leave_date: {$eq: null}}, '_id')})));
  return {...(user.toObject ? user.toObject() : user), requests};
}

const parseUserTeamSelected = async (user) => {
  let teamSelected = await Teams.findById(user.teamSelected, '_id name leader managers members requests');
  teamSelected = await parseTeamLeader(teamSelected);
  teamSelected = await parseTeamMembers(teamSelected);
  teamSelected = await parseTeamRequests(teamSelected);
  teamSelected = await wrap.team(teamSelected, true);
  return {...(user.toObject ? user.toObject() : user), teamSelected};
}

module.exports = {
  team: {
    leader: parseTeamLeader,
    requests: parseTeamRequests,
    members: parseTeamMembers
  },
  user: {
    requests: parseUserRequests,
    teamSelected: parseUserTeamSelected
  }
}