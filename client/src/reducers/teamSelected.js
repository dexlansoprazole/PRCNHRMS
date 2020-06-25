import {actionTypes} from '../constants';

const initialState = {
  _id: "",
  name: "",
  users: [],
  members: []
}

function teamSelected(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
    case actionTypes.TRY_LOGIN_SUCCESS:
      return Object.assign({}, state, action.teamSelected);
    case actionTypes.PATCH_USER_SUCCESS:
    case actionTypes.ADD_TEAM_SUCCESS:
    case actionTypes.PATCH_TEAM_SUCCESS:
    case actionTypes.DELETE_TEAM_SUCCESS:
      if (!action.res.teamSelected)
        return Object.assign({}, state, initialState);
      return Object.assign({}, state, action.res.teamSelected);
    default:
      return state;
  }
}

export default teamSelected;