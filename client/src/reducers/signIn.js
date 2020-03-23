import {actionTypes} from '../constants';

const initialState = {
  isSignedIn: false
}

function team(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return Object.assign({}, state,
        {isSignedIn: true}
      );
    case actionTypes.LOGOUT_SUCCESS:
      return Object.assign({}, state,
        {isSignedIn: false}
      );
    case actionTypes.SET_IS_SIGNED_IN:
      return Object.assign({}, state,
        action.signIn
      );
    default:
      return state;
  }
}

export default team;