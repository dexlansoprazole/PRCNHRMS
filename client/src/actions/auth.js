import LogRocket from 'logrocket';
import signInService from '../services/authService';
import {actionTypes} from '../constants';

const signIn = (googleUser) => {
  return async (dispatch) => {
    dispatch(request());
    try {
      const id_token = googleUser ? googleUser.getAuthResponse().id_token : null;
      const res = await signInService.signIn(id_token);
      const user = res.user || null;
      if (!user) {
        dispatch(failure());
        return;
      }

      if (process.env.NODE_ENV === 'production') {
        LogRocket.identify(user._id, {
          name: user.name,
          email: user.email,
        });
      }
      dispatch(success(res));
    } catch (error) {
      console.error(error);
      dispatch(failure());
    }
  }

  function request() {return {type: googleUser ? actionTypes.LOGIN_REQUEST : actionTypes.TRY_LOGIN_REQUEST}}
  function success(res) {return {type: googleUser ? actionTypes.LOGIN_SUCCESS : actionTypes.TRY_LOGIN_SUCCESS, user: res.user, teams: res.teams}}
  function failure() {return {type: googleUser ? actionTypes.LOGIN_FAILURE : actionTypes.TRY_LOGIN_FAILURE}}
}

const signOut = () => {
  return {
    types: [actionTypes.LOGOUT_REQUEST, actionTypes.LOGOUT_SUCCESS, actionTypes.LOGOUT_FAILURE],
    callAPI: () => signInService.signOut()
  }
}

const trySignIn = () => {
  return async (dispatch) => {
    dispatch(request());
    try {
      await dispatch(signIn());
    } catch (error) {
      console.error(error);
      dispatch(failure());
    }
    dispatch(success());
  }

  function request() {return {type: actionTypes.TRY_LOGIN_REQUEST}}
  function success() {return {type: actionTypes.TRY_LOGIN_SUCCESS}}
  function failure() {return {type: actionTypes.TRY_LOGIN_FAILURE}}
}

const initGoogleSignIn = () => {
  return async (dispatch) => {
    dispatch(request());
    try {
      await window.gapi.load('auth2', async () => {
        const auth2 = await window.gapi.auth2.init({client_id: process.env.REACT_APP_CLIENT_ID, cookie_policy: 'none'});
        auth2.attachClickHandler(window.$('#signIn').get(0), {},
          async (googleUser) => {
            await dispatch(signIn(googleUser));
          },
          (error) => {
            console.error(error);
            dispatch(failure());
          });
      });
    } catch (error) {
      console.error(error);
      dispatch(failure());
    }
    dispatch(success());
  }

  function request() {return {type: actionTypes.INIT_GOOGLESIGNIN_REQUEST}}
  function success() {return {type: actionTypes.INIT_GOOGLESIGNIN_SUCCESS}}
  function failure() {return {type: actionTypes.INIT_GOOGLESIGNIN_FAILURE}}
}

export default {
  signIn,
  signOut,
  trySignIn,
  initGoogleSignIn
};