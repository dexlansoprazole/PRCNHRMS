import {actionTypes, memberFilters} from '../constants';

const initialState = {
  memberFilter: memberFilters.ACTIVE,
  members: [],
  memberSelected: {}
}

function member(state = initialState, action) {
  let members = state.members.slice();
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
        members: action.res.members
      });
    case actionTypes.ADD_MEMBER_SUCCESS:
      members.push(action.res.member);
      return Object.assign({}, state, {
        members: members
      });
    case actionTypes.DELETE_MEMBER_SUCCESS:
      members = members.filter(m => m._id !== action.res.member._id);
      return Object.assign({}, state, {
        members: members
      });
    case actionTypes.PATCH_MEMBER_SUCCESS:
      members = members.map(m => (m._id === action.res.member._id) ? action.res.member : m);
      return Object.assign({}, state, {
        members: members
      });
    case actionTypes.LOGOUT_SUCCESS:
      return Object.assign({}, state, initialState);
    default:
      return state;
  }
}

export default member;