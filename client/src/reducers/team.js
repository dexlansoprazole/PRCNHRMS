import {actionTypes} from '../constants';

const initialState = {
  teams: [],
  teamSelected: {}
}

function team(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_TEAM_SUCCESS:
      return Object.assign({}, state, {
        teams: action.res.teams
      });
    case actionTypes.ADD_TEAM_SUCCESS:
      return Object.assign({}, state, {
        teams: action.res.teams
      });
    case actionTypes.LOGOUT_SUCCESS:
      return Object.assign({}, state,
        initialState
      );
    case actionTypes.SET_TEAM_SELECTED:
      return Object.assign({}, state, {
        teamSelected: action.team
      });
    default:
      return state;
  }
}

export default team;