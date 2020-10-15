import {actionTypes} from '../constants';

const initialState = []

function teams(state = initialState, action) {
  let teams = state.slice();
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
    case actionTypes.TRY_LOGIN_SUCCESS:
      return action.teams.slice();
    case actionTypes.PATCH_USER_SUCCESS:
      return action.res.teams.slice();
    case actionTypes.ADD_TEAM_SUCCESS:
      teams.push(action.res.team);
      return teams;
    case actionTypes.DELETE_TEAM_SUCCESS:
    case actionTypes.LEAVE_TEAM_SUCCESS:
      teams = teams.filter(t => t._id !== action.res.team._id);
      return teams;
    case actionTypes.PATCH_TEAM_SUCCESS:
    case actionTypes.ADD_TEAM_MEMBER_SUCCESS:
    case actionTypes.DELETE_TEAM_MEMBER_SUCCESS:
    case actionTypes.DELETE_JOIN_TEAM_REQUEST_SUCCESS:
      teams = teams.map(t => (t._id === action.res.team._id) ? action.res.team : t);
      return teams;
    case actionTypes.ADD_MEMBER_SUCCESS:
      teams.forEach(team => {
        if (team._id === action.res.member.team)
          team.members.push(action.res.member);
      });
      return teams;
    case actionTypes.DELETE_MEMBER_SUCCESS:
      teams.forEach(team => {
        if (team._id === action.res.member.team)
          team.members = team.members.filter(m => m._id !== action.res.member._id);
      });
      return teams;
    case actionTypes.PATCH_MEMBER_SUCCESS:  
      if (action.res != null)
        teams.forEach(team => {
          if (team._id === action.res.member.team)
            team.members = team.members.map(m => (m._id === action.res.member._id) ? action.res.member : m);
        });
      return teams;
    case actionTypes.LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
}

export default teams;