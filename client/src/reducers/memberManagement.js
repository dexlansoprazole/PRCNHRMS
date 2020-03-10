import {MemberFilters} from '../actions/memberManagement';
import actionTypes from '../actionTypes';

const initialState = {
  memberFilter: MemberFilters.ACTIVE,
  members: [],
}

function memberManagement(state = initialState, action) {
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
    default:
      return state;
  }
}

export default memberManagement;