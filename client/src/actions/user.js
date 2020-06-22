import userService from '../services/userService';
import {actionTypes} from '../constants';

const patchUser = (data) => {
  return {
    types: [actionTypes.PATCH_USER_REQUEST, actionTypes.PATCH_USER_SUCCESS, actionTypes.PATCH_USER_FAILURE],
    callAPI: () => userService.patch(data)
  }
}

export default {
  patchUser
};