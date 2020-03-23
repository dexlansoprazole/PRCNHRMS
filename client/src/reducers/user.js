import {actionTypes} from '../constants';

const initialState = {
  _id: null,
  id: null,
  email: null,
  name: null,
  team: null
}

function user(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return Object.assign({}, state, 
        action.user
      );
    case actionTypes.LOGOUT_SUCCESS:
      return Object.assign({}, state, 
        initialState
      );
    case actionTypes.PATCH_USER_SUCCESS:
      return Object.assign({}, state,
        action.user
      );
    default:
      return state;
  }
}

export default user;