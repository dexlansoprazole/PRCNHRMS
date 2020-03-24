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

function team(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isSignedIn: true,
        user: action.user
      });
    case actionTypes.LOGOUT_SUCCESS:
      localStorage.clear();
      return Object.assign({}, state,
        initialState
      );
    case actionTypes.SET_IS_SIGNED_IN:
      return Object.assign({}, state,
        {isSignedIn: action.isSignedIn}
      );
    case actionTypes.SET_USER:
      return {
        ...state,
        isSignedIn: true,
        user: action.user
      }
    default:
      return state;
  }
}

export default team;