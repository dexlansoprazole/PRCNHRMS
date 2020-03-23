import teamService from '../services/teamService';
import {actionTypes} from '../constants';
import userActions from './user';

const getTeams = (query = null) => {
  return {
    types: [actionTypes.GET_TEAM_REQUEST, actionTypes.GET_TEAM_SUCCESS, actionTypes.GET_TEAM_FAILURE],
    callAPI: () => teamService.get(query)
  }
}

const addTeam = (user_id, newTeam) => { //TODO: use middleware
  return async dispatch => {
    dispatch(request());
    try {
      const team = await teamService.add(newTeam);
      await dispatch(userActions.patch(user_id, {team: team._id}));
      dispatch(success(team));
      //TODO: refresh members?
    } catch (error) {
      dispatch(failure());
    }
  }

  function request() {return {type: actionTypes.ADD_TEAM_REQUEST}}
  function success(team) {return {type: actionTypes.ADD_TEAM_SUCCESS, team: {_id: team._id, name: team.name}}}
  function failure() {return {type: actionTypes.ADD_TEAM_FAILURE}}
}

export default {
  getTeams,
  addTeam
};