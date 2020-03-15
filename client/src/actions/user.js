import userService from '../services/userService';
import actionTypes from '../actionTypes';

const patch = (id, data) => {
  return async dispatch => {
    dispatch(request());
    try {
      const user = await userService.patch(id, data);
      dispatch(success(user));
    } catch (error) {
      dispatch(failure());
    }
  }

  function request() {return {type: actionTypes.PATCH_USER_REQUEST}}
  function success(user) {return {type: actionTypes.PATCH_USER_SUCCESS, user: {_id: user._id, id: user.id, name: user.name, team: user.team}}}
  function failure() {return {type: actionTypes.PATCH_USER_FAILURE}}
}

export default {
  patch
};