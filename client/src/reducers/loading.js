import {actionTypes} from '../constants';

const initialState = false

function loading(state = initialState, action) {
  switch (action.type) {
    case actionTypes.INIT_GOOGLESIGNIN_REQUEST:
      return true;
    case actionTypes.INIT_GOOGLESIGNIN_SUCCESS:
      return false;
    case actionTypes.INIT_GOOGLESIGNIN_FAILURE:
      return false;
    case actionTypes.TRY_LOGIN_REQUEST:
      return true;
    case actionTypes.TRY_LOGIN_SUCCESS:
      return false;
    case actionTypes.TRY_LOGIN_FAILURE:
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
    case actionTypes.ADD_MEMBER_REQUEST:
      return true;
    case actionTypes.ADD_MEMBER_SUCCESS:
      return false;
    case actionTypes.ADD_MEMBER_FAILURE:
      return false;
    case actionTypes.DELETE_MEMBER_REQUEST:
      return true;
    case actionTypes.DELETE_MEMBER_SUCCESS:
      return false;
    case actionTypes.DELETE_MEMBER_FAILURE:
      return false;
    case actionTypes.PATCH_MEMBER_REQUEST:
      return true;
    case actionTypes.PATCH_MEMBER_SUCCESS:
      return false;
    case actionTypes.PATCH_MEMBER_FAILURE:
      return false;
    case actionTypes.ADD_TEAM_REQUEST:
      return true;
    case actionTypes.ADD_TEAM_SUCCESS:
      return false;
    case actionTypes.ADD_TEAM_FAILURE:
      return false;
    case actionTypes.DELETE_TEAM_REQUEST:
      return true;
    case actionTypes.DELETE_TEAM_SUCCESS:
      return false;
    case actionTypes.DELETE_TEAM_FAILURE:
      return false;
    case actionTypes.PATCH_TEAM_REQUEST:
      return true;
    case actionTypes.PATCH_TEAM_SUCCESS:
      return false;
    case actionTypes.PATCH_TEAM_FAILURE:
      return false;
    default:
      return state;
  }
}

export default loading;