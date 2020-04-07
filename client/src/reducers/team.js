import {actionTypes} from '../constants';

const initialState = {
  teams: [],
  teamSelected: {},
  search: {
    loading: false,
    result: []
  }
}

function team(state = initialState, action) {
  let teams = state.teams.slice();
  let result = state.search.result.slice();
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
    case actionTypes.SEARCH_TEAM_REQUEST:
      return Object.assign({}, state, {
        search: {
          ...state.search,
          loading: true
        }
      });
    case actionTypes.SEARCH_TEAM_SUCCESS:
      return Object.assign({}, state, {
        search: {
          loading: false,
          result: action.res.teams
        }
      });
    case actionTypes.SEARCH_TEAM_FAILURE:
      return Object.assign({}, state, {
        search: {
          ...state.search,
          loading: false
        }
      });
    case actionTypes.ADD_JOIN_TEAM_REQUEST_SUCCESS:
      result = result.map(r => r._id === action.res.team._id ? action.res.team : r);
      return Object.assign({}, state, {
        search: {
          ...state.search,
          result
        }
      });
    case actionTypes.DELETE_JOIN_TEAM_REQUEST_SUCCESS:
      result = result.map(r => r._id === action.res.team._id ? action.res.team : r);
      return Object.assign({}, state, {
        search: {
          ...state.search,
          result
        }
      });
    case actionTypes.LOGOUT_SUCCESS:
      return Object.assign({}, state, initialState);
    case actionTypes.SET_TEAM_SELECTED:
      localStorage.setItem('teamSelected', action.team._id)
      return Object.assign({}, state, {
        teamSelected: action.team
      });
    case actionTypes.SET_SEARCH_TEAM_RESULT:
      return Object.assign({}, state, {
        search: {
          ...state.search,
          result: action.result
        }
      });
    default:
      return state;
  }
}

export default team;