import {actionTypes} from '../constants';

const initialState = {
  _id: null,
  name: null
}

function team(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_TEAM_SUCCESS:
      return Object.assign({}, state, 
        action.res.teams[0]
      );
    case actionTypes.ADD_TEAM_SUCCESS:
      return Object.assign({}, state, 
        action.res.teams
      );
    case actionTypes.LOGOUT_SUCCESS:
      return Object.assign({}, state,
        initialState
      );
    default:
      return state;
  }
}

export default team;