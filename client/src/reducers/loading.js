import {actionTypes} from '../constants';

const initialState = false

function loading(state = initialState, action) {
  switch (action.type) {
    case actionTypes.INIT_GOOGLESIGNIN_REQUEST:
    case actionTypes.TRY_LOGIN_REQUEST:
    case actionTypes.LOGIN_REQUEST:
    case actionTypes.LOGOUT_REQUEST:
    case actionTypes.ADD_MEMBER_REQUEST:
    case actionTypes.DELETE_MEMBER_REQUEST:
    case actionTypes.PATCH_MEMBER_REQUEST:
    case actionTypes.ADD_TEAM_REQUEST:
    case actionTypes.DELETE_TEAM_REQUEST:
    case actionTypes.PATCH_TEAM_REQUEST:
    case actionTypes.ADD_JOIN_TEAM_REQUEST_REQUEST:
    case actionTypes.DELETE_JOIN_TEAM_REQUEST_REQUEST:
    case actionTypes.ADD_TEAM_MEMBER_REQUEST:
    case actionTypes.DELETE_TEAM_MEMBER_REQUEST:
    case actionTypes.PATCH_USER_REQUEST:
      return true;
    case actionTypes.INIT_GOOGLESIGNIN_SUCCESS:
    case actionTypes.INIT_GOOGLESIGNIN_FAILURE:
    case actionTypes.TRY_LOGIN_SUCCESS:
    case actionTypes.TRY_LOGIN_FAILURE:
    case actionTypes.LOGIN_SUCCESS:
    case actionTypes.LOGIN_FAILURE:
    case actionTypes.LOGOUT_SUCCESS:
    case actionTypes.LOGOUT_FAILURE:
    case actionTypes.ADD_MEMBER_SUCCESS:
    case actionTypes.ADD_MEMBER_FAILURE:
    case actionTypes.DELETE_MEMBER_SUCCESS:
    case actionTypes.DELETE_MEMBER_FAILURE:
    case actionTypes.PATCH_MEMBER_SUCCESS:
    case actionTypes.PATCH_MEMBER_FAILURE:
    case actionTypes.ADD_TEAM_SUCCESS:
    case actionTypes.ADD_TEAM_FAILURE:
    case actionTypes.DELETE_TEAM_SUCCESS:
    case actionTypes.DELETE_TEAM_FAILURE:
    case actionTypes.PATCH_TEAM_SUCCESS:
    case actionTypes.PATCH_TEAM_FAILURE:
    case actionTypes.ADD_JOIN_TEAM_REQUEST_SUCCESS:
    case actionTypes.ADD_JOIN_TEAM_REQUEST_FAILURE:
    case actionTypes.DELETE_JOIN_TEAM_REQUEST_SUCCESS:
    case actionTypes.DELETE_JOIN_TEAM_REQUEST_FAILURE:
    case actionTypes.ADD_TEAM_MEMBER_SUCCESS:
    case actionTypes.ADD_TEAM_MEMBER_FAILURE:
    case actionTypes.DELETE_TEAM_MEMBER_SUCCESS:
    case actionTypes.DELETE_TEAM_MEMBER_FAILURE:
    case actionTypes.PATCH_USER_SUCCESS:
    case actionTypes.PATCH_USER_FAILURE:
      return false;
    default:
      return state;
  }
}

export default loading;