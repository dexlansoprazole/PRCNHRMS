import userService from '../services/userService';
import {actionTypes} from '../constants';

const patchUser = (data) => {
  return {
    types: [actionTypes.PATCH_USER_REQUEST, actionTypes.PATCH_USER_SUCCESS, actionTypes.PATCH_USER_FAILURE],
    callAPI: () => userService.patch(data)
  }
}

const patchTeamSelected = (team_id) => {
  return {
    types: [actionTypes.PATCH_TEAM_SELECTED_REQUEST, actionTypes.PATCH_TEAM_SELECTED_SUCCESS, actionTypes.PATCH_TEAM_SELECTED_FAILURE],
    callAPI: () => userService.patch({teamSelected: team_id})
  }
}

export default {
  patchUser,
  patchTeamSelected
};