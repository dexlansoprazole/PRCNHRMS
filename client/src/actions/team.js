import teamService from '../services/teamService';
import actionTypes from '../actionTypes';
import userActions from './user';

const get = (query) => {
  return async dispatch => {
    dispatch(request());
    try {
      const team = (await teamService.get(query))[0];
      dispatch(success(team));
    } catch (error) {
      dispatch(failure());
    }
  }

  function request() {return {type: actionTypes.GET_TEAM_REQUEST}}
  function success(team) {return {type: actionTypes.GET_TEAM_SUCCESS, team: {_id: team._id, name: team.name}}}
  function failure() {return {type: actionTypes.GET_TEAM_FAILURE}}
}

const add = (user_id, newTeam) => {
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
  get,
  add
};