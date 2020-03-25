import {actionTypes} from '../constants';

const initialState = false

function initialized(state = initialState, action) {
  switch (action.type) {
    case actionTypes.INIT_AUTH_SUCCESS:
      return true;
    default:
      return state;
  }
}

export default initialized;