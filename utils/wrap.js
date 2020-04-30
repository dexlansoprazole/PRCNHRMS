const mongoose = require('mongoose');
const Users = mongoose.model('users');
const Teams = mongoose.model('teams');
const Players = mongoose.model('players');

module.exports = {
  team: async (team) => {
    team = {_id: team._id, name: team.name, users: {leader: team.leader, managers: team.managers, members: team.members, requests: team.requests}};
    // Get members
    team = {...team, members: await Players.find({team: team._id}, '-__v')}; //TODO: Do not send member data
    return team;
  },
  user: () => {

  }
}