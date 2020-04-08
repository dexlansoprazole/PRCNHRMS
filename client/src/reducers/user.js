import {actionTypes} from '../constants';

const initialState = {}

function user(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return Object.assign({}, state, action.user);
    case actionTypes.TRY_LOGIN_SUCCESS:
      return Object.assign({}, state, action.user);
    case actionTypes.LOGOUT_SUCCESS:
      localStorage.clear();
      return initialState;
    case actionTypes.ADD_JOIN_TEAM_REQUEST_SUCCESS:
      return Object.assign({}, state, action.res.user);
    case actionTypes.DELETE_JOIN_TEAM_REQUEST_SUCCESS:
      return Object.assign({}, state, action.res.user);
    default:
      return state;
  }
}

export default user;