import actionTypes from '../actionTypes';

const initialState = false

function loading(state = initialState, action) {
  switch (action.type) {
    case actionTypes.INIT_GAPI_REQUEST:
      return true;
    case actionTypes.INIT_GAPI_SUCCESS:
      return false;
    case actionTypes.INIT_GAPI_FAILURE:
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