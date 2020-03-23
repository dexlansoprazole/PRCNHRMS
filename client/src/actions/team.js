import teamService from '../services/teamService';
import {actionTypes} from '../constants';

const getTeams = (query = null) => {
  return {
    types: [actionTypes.GET_TEAM_REQUEST, actionTypes.GET_TEAM_SUCCESS, actionTypes.GET_TEAM_FAILURE],
    callAPI: () => teamService.get(query)
  }
}

const addTeam = (newTeam) => {
  return {
    types: [actionTypes.ADD_TEAM_REQUEST, actionTypes.ADD_TEAM_SUCCESS, actionTypes.ADD_TEAM_FAILURE],
    callAPI: () => teamService.add(newTeam)
  }
}

export default {
  getTeams,
  addTeam
};