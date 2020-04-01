import {actionTypes} from '../constants';

const initialState = {
  isSignedIn: false,
  user: {
    _id: null,
    id: null,
    email: null,
    name: null
  }
}

function auth(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isSignedIn: true,
        user: action.user
      });
    case actionTypes.TRY_LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isSignedIn: true,
        user: action.user
      });
    case actionTypes.LOGOUT_SUCCESS:
      localStorage.clear();
      return Object.assign({}, state,
        initialState
      );
    default:
      return state;
  }
}

export default auth;