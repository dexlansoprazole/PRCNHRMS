import {actionTypes} from '../constants';

const initialState = false

function loading(state = initialState, action) {
  switch (action.type) {
    case actionTypes.INIT_AUTH_REQUEST:
      return true;
    case actionTypes.INIT_AUTH_SUCCESS:
      return false;
    case actionTypes.INIT_AUTH_FAILURE:
      return false;
    case actionTypes.LOGIN_REQUEST:
      return true;
    case actionTypes.LOGIN_SUCCESS:
      return false;
    case actionTypes.LOGIN_FAILURE:
      return false;
    case actionTypes.LOGOUT_REQUEST:
      return true;
    case actionTypes.LOGOUT_SUCCESS:
      return false;
    case actionTypes.LOGOUT_FAILURE:
      return false;
    default:
      return state;
  }
}

export default loading;