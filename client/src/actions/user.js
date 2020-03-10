import userService from '../services/userService';
import actionTypes from '../actionTypes';

const login = (googleUser) => {
  return dispatch => {
  dispatch(request());
    var id_token = googleUser.getAuthResponse().id_token;
    userService.login(id_token).then(
      user => {
        dispatch(success(user));
      },
      error => {
        dispatch(failure());
      }
    );
  }

  function request() {return {type: actionTypes.LOGIN_REQUEST}}
  function success(user) {return {type: actionTypes.LOGIN_SUCCESS, user: user}}
  function failure() {return {type: actionTypes.LOGIN_FAILURE}}
}

const logout = () => {
  return dispatch => {
    dispatch(request());
    var auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut().then(function() {
      userService.logout();
      dispatch(success());
    });
  }

  function request() {return {type: actionTypes.LOGOUT_REQUEST}}
  function success() {return {type: actionTypes.LOGOUT_SUCCESS, user: {}}}
  function failure() {return {type: actionTypes.LOGOUT_FAILURE}}
}

export const userActions = {
  login,
  logout
};