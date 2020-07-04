import {actionTypes} from '../constants';

const initialState = null

function teamSelected(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
    case actionTypes.TRY_LOGIN_SUCCESS:
      return action.teamSelected;
    case actionTypes.PATCH_USER_SUCCESS:
    case actionTypes.ADD_TEAM_SUCCESS:
    case actionTypes.DELETE_TEAM_SUCCESS:
    case actionTypes.LEAVE_TEAM_SUCCESS:
      if (!action.res.teamSelected)
        return initialState;
      return action.res.teamSelected;
    default:
      return state;
  }
}

export default teamSelected;