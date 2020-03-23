import {actionTypes} from '../constants';

const initialState = {
  _id: null,
  name: null,
  leader: null,
  managers: []
}

function team(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_TEAM_SUCCESS:
      return Object.assign({}, state, 
        action.res.teams[0]
      );
    case actionTypes.ADD_TEAM_SUCCESS:
      console.log(action.res);
      
      return Object.assign({}, state, 
        action.res.team
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