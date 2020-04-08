import {actionTypes} from '../constants';

const initialState = {
  search: { //TODO: remove
    loading: false,
    result: []
  }
}

function team(state = initialState, action) {
  let result = state.search.result.slice();
  switch (action.type) {
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