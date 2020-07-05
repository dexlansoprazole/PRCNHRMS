import {actionTypes} from '../constants';

const initialState = false

function isDarkMode(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_IS_DARK_MODE:
      return action.value;
    default:
      return state;
  }
}

export default isDarkMode;