import actionTypes from '../actionTypes';

const initialState = {
  user: {}
}

function user(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        user: action.user
      });
    case actionTypes.LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        user: action.user
      });
    default:
      return state;
  }
}

export default user;