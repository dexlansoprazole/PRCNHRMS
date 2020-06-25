const mongoose = require('mongoose');
const Users = mongoose.model('users');
const Teams = mongoose.model('teams');
const Players = mongoose.model('players');

module.exports = {
  team: async (team, getMembers = false) => {
    team = {
      _id: team._id,
      name: team.name,
      users: {
        leader: team.leader,
        managers: team.managers ? team.managers : [],
        members: team.members ? team.members : [],
        requests: team.requests ? team.requests : []
      }
    };
    // Get members
    if(getMembers)
      team = {...team, members: await Players.find({team: team._id}, '-__v')};
    else
      team = {...team, members: await Players.find({team: team._id, leave_date: {$eq: null}}, '_id')};
    return team;
  },
  user: () => {

  }
}