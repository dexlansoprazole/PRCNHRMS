import {actionTypes} from '../constants';

const initialState = false

function initialized(state = initialState, action) {
  switch (action.type) {
    case actionTypes.TRY_LOGIN_SUCCESS:
      return true;
    case actionTypes.TRY_LOGIN_FAILURE:
      return true;
    default:
      return state;
  }
}

export default initialized;