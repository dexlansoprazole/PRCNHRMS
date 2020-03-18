import {MemberFilters} from '../actions/member';
import actionTypes from '../actionTypes';

const initialState = {
  memberFilter: MemberFilters.ACTIVE,
  members: [],
  memberSelected: null
}

function member(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_MEMBER_FILTER:
      return Object.assign({}, state, {
        memberFilter: action.filter
      });
    case actionTypes.SET_MEMBER_SELECTED:
      return Object.assign({}, state, {
        memberSelected: action.member
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
    case actionTypes.LOGOUT_SUCCESS:
      return Object.assign({}, state, initialState);
    default:
      return state;
  }
}

export default member;