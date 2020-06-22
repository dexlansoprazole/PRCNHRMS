import {actionTypes} from '../constants';

const initialState = {}

function teamSelected(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
    case actionTypes.TRY_LOGIN_SUCCESS:
      return Object.assign({}, state, action.teamSelected);
    case actionTypes.PATCH_USER_SUCCESS:
      return Object.assign({}, state, action.res.teamSelected);
    default:
      return state;
  }
}

export default teamSelected;