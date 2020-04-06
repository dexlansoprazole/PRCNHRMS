import {actionTypes} from '../constants';

const initialState = {
  teams: [],
  teamSelected: {}
}

function team(state = initialState, action) {
  let teams = state.teams.slice();
  let teamSelected = state.teamSelected;
  switch (action.type) {
    case actionTypes.GET_TEAM_SUCCESS:
      return Object.assign({}, state, {
        teams: action.res.teams
      });
    case actionTypes.ADD_TEAM_SUCCESS:
      teams.push(action.res.team);
      return Object.assign({}, state, {
        teams
      });
    case actionTypes.DELETE_TEAM_SUCCESS:
      teams = teams.filter(t => t._id !== action.res.team._id);
      teamSelected = teams.length > 0 ? teams[0] : {};
      if (teamSelected)
        localStorage.setItem('teamSelected', teamSelected._id);
      else
        localStorage.removeItem('teamSelected');
      return Object.assign({}, state, {
        teams,
        teamSelected
      });
    case actionTypes.PATCH_TEAM_SUCCESS:
      teams = teams.map(t => (t._id === action.res.team._id) ? action.res.team : t);
      if (teamSelected._id === action.res.team._id)
        teamSelected = action.res.team
      return Object.assign({}, state, {
        teams,
        teamSelected
      });
    case actionTypes.LOGOUT_SUCCESS:
      return Object.assign({}, state, initialState);
    case actionTypes.SET_TEAM_SELECTED:
      localStorage.setItem('teamSelected', action.team._id)
      return Object.assign({}, state, {
        teamSelected: action.team
      });
    default:
      return state;
  }
}

export default team;