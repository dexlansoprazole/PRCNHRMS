import {MemberFilters} from '../actions/member';
import actionTypes from '../actionTypes';

const initialState = {
  loading: false,
  memberFilter: MemberFilters.ACTIVE,
  members: [],
}

function member(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_MEMBER_FILTER:
      return Object.assign({}, state, {
        memberFilter: action.filter
      });
    case actionTypes.GET_MEMBERS_SUCCESS:
      return Object.assign({}, state, {
        members: action.members
      });
    case actionTypes.ADD_MEMBER_SUCCESS:
      return Object.assign({}, state, {
        members: action.members
      });
    case actionTypes.DELETE_MEMBER_SUCCESS:
      return Object.assign({}, state, {
        members: action.members
      });
    case actionTypes.PATCH_MEMBER_SUCCESS:
      return Object.assign({}, state, {
        members: action.members
      });
    case actionTypes.INIT_GAPI_REQUEST:
      return Object.assign({}, state, {
        loading: true
      });
    case actionTypes.INIT_GAPI_SUCCESS:
      return Object.assign({}, state, {
        loading: false
      });
    case actionTypes.INIT_GAPI_FAILURE:
      return Object.assign({}, state, {
        loading: false
      });
    case actionTypes.LOGIN_REQUEST:
      return Object.assign({}, state, {
        loading: true
      });
    case actionTypes.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        loading: false
      });
    case actionTypes.LOGIN_FAILURE://TODO: alert
      return Object.assign({}, state, {
        loading: false
      });
    case actionTypes.LOGOUT_REQUEST:
      return Object.assign({}, state, {
        loading: true
      });
    case actionTypes.LOGOUT_SUCCESS:
      return Object.assign({}, state,
        {
          ...initialState,
          loading: false
        }
      );
    case actionTypes.LOGOUT_FAILURE://TODO: alert
      return Object.assign({}, state, {
        loading: false
      });
    default:
      return state;
  }
}

export default member;