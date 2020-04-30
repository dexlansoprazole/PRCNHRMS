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

const addJoinRequest = (team_id) => {
  return {
    types: [actionTypes.ADD_JOIN_TEAM_REQUEST_REQUEST, actionTypes.ADD_JOIN_TEAM_REQUEST_SUCCESS, actionTypes.ADD_JOIN_TEAM_REQUEST_FAILURE],
    callAPI: () => teamService.request.add(team_id)
  }
}

const deleteJoinRequest = (team_id, user_id = null) => {
  return {
    types: [actionTypes.DELETE_JOIN_TEAM_REQUEST_REQUEST, actionTypes.DELETE_JOIN_TEAM_REQUEST_SUCCESS, actionTypes.DELETE_JOIN_TEAM_REQUEST_FAILURE],
    callAPI: () => teamService.request.delete(team_id, user_id)
  }
}

const addMember = (team_id, user_id) => {
  return {
    types: [actionTypes.ADD_TEAM_MEMBER_REQUEST, actionTypes.ADD_TEAM_MEMBER_SUCCESS, actionTypes.ADD_TEAM_MEMBER_FAILURE],
    callAPI: () => teamService.member.add(team_id, user_id)
  }
}

const deleteMember = (team_id, user_id) => {
  return {
    types: [actionTypes.DELETE_TEAM_MEMBER_REQUEST, actionTypes.DELETE_TEAM_MEMBER_SUCCESS, actionTypes.DELETE_TEAM_MEMBER_FAILURE],
    callAPI: () => teamService.member.delete(team_id, user_id)
  }
}

export default {
  getTeams,
  addTeam,
  deleteTeam,
  patchTeam,
  searchTeams,
  addJoinRequest,
  deleteJoinRequest,
  addMember,
  deleteMember
};