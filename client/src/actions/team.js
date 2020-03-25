import teamService from '../services/teamService';
import {actionTypes} from '../constants';

const getTeams = (query = null) => {
  return {
    types: [actionTypes.GET_TEAM_REQUEST, actionTypes.GET_TEAM_SUCCESS, actionTypes.GET_TEAM_FAILURE],
    callAPI: () => teamService.get(query)
  }
}

// const addTeam = (newTeam) => {
//   return {
//     types: [actionTypes.ADD_TEAM_REQUEST, actionTypes.ADD_TEAM_SUCCESS, actionTypes.ADD_TEAM_FAILURE],
//     callAPI: () => teamService.add(newTeam)
//   }
// }

const addTeam = (newTeam) => { //TODO: use middleware
  return async (dispatch, getState) => {
    dispatch(request());
    try {
      const res = await teamService.add(newTeam);
      const teamSelected = getState().team.teamSelected;
      if (Object.keys(teamSelected).length === 0 && teamSelected.constructor === Object)
        dispatch(setTeamSelected(res.team));
      dispatch(success(res));
    } catch (error) {
      dispatch(failure());
    }
  }

  function request() {return {type: actionTypes.ADD_TEAM_REQUEST}}
  function success(res) {return {type: actionTypes.ADD_TEAM_SUCCESS, res}}
  function failure() {return {type: actionTypes.ADD_TEAM_FAILURE}}
}

const setTeamSelected = (team) => {
  return {type: actionTypes.SET_TEAM_SELECTED, team};
}

export default {
  getTeams,
  addTeam,
  setTeamSelected
};