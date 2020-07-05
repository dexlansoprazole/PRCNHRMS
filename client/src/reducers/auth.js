import {actionTypes} from '../constants';

const initialState = {
  isSignedIn: false
}

function auth(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isSignedIn: true
      });
    case actionTypes.TRY_LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isSignedIn: true
      });
    case actionTypes.LOGOUT_SUCCESS:
      return Object.assign({}, state,
        initialState
      );
    default:
      return state;
  }
}

export default auth;