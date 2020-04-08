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

const deleteTeam = (id) => {
  return {
    types: [actionTypes.DELETE_TEAM_REQUEST, actionTypes.DELETE_TEAM_SUCCESS, actionTypes.DELETE_TEAM_FAILURE],
    callAPI: () => teamService.delete(id)
  }
}

const patchTeam = (id, data) => {
  return {
    types: [actionTypes.PATCH_TEAM_REQUEST, actionTypes.PATCH_TEAM_SUCCESS, actionTypes.PATCH_TEAM_FAILURE],
    callAPI: () => teamService.patch(id, data)
  }
}

const searchTeams = (query) => {
  return {
    types: [actionTypes.SEARCH_TEAM_REQUEST, actionTypes.SEARCH_TEAM_SUCCESS, actionTypes.SEARCH_TEAM_FAILURE],
    callAPI: () => teamService.get(query)
  }
}

const addJoinRequest = (id) => {
  return {
    types: [actionTypes.ADD_JOIN_TEAM_REQUEST_REQUEST, actionTypes.ADD_JOIN_TEAM_REQUEST_SUCCESS, actionTypes.ADD_JOIN_TEAM_REQUEST_FAILURE],
    callAPI: () => teamService.request.add(id)
  }
}

const deleteJoinRequest = (id) => {
  return {
    types: [actionTypes.DELETE_JOIN_TEAM_REQUEST_REQUEST, actionTypes.DELETE_JOIN_TEAM_REQUEST_SUCCESS, actionTypes.DELETE_JOIN_TEAM_REQUEST_FAILURE],
    callAPI: () => teamService.request.delete(id)
  }
}

export default {
  getTeams,
  addTeam,
  deleteTeam,
  patchTeam,
  searchTeams,
  addJoinRequest,
  deleteJoinRequest
};