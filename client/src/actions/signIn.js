import signInService from '../services/signInService';
import actionTypes from '../actionTypes';
import teamActions from './team';
import memberActions from './member'

const login = (googleUser) => {
  return async dispatch => {
    dispatch(request());
    const id_token = googleUser.getAuthResponse().id_token;

    try {
      const user = await signInService.login(id_token);
      
      if (user.team && user.team.length > 0) {
        await dispatch(teamActions.get({_id: user.team}));
        await dispatch(memberActions.getMembers({team: user.team}))
      }
        
      dispatch(success(user));
    } catch (error) {
      dispatch(failure());
      dispatch(logout());
    }
  }

  function request() {return {type: actionTypes.LOGIN_REQUEST}}
  function success(user) {return {type: actionTypes.LOGIN_SUCCESS, user: {_id: user._id, id: user.id, name: user.name, team: user.team}}}
  function failure() {return {type: actionTypes.LOGIN_FAILURE}}
}

const logout = () => {
  return async dispatch => {
    dispatch(request());
    const auth2 = window.gapi.auth2.getAuthInstance();
    try {
      await auth2.signOut();
      signInService.logout();
    } catch (error) {
      dispatch(failure());
    }
    dispatch(success());
  }

  function request() {return {type: actionTypes.LOGOUT_REQUEST}}
  function success() {return {type: actionTypes.LOGOUT_SUCCESS}}
  function failure() {return {type: actionTypes.LOGOUT_FAILURE}}
}

const initGapi = () => {
  return async dispatch => {
    dispatch(request());
    try {
      const auth2 = await window.gapi.auth2.init({client_id: process.env.REACT_APP_CLIENT_ID});
      auth2.attachClickHandler(window.$('#signIn').get(0), {},
        (googleUser) => {
          dispatch(login(googleUser));
        },
        (error) => {
          dispatch(failure());
        });
      dispatch(success());
    } catch (error) {
      console.error(error);
      
      dispatch(failure());
    }
  }

  function request() {return {type: actionTypes.INIT_GAPI_REQUEST}}
  function success() {return {type: actionTypes.INIT_GAPI_SUCCESS}}
  function failure() {return {type: actionTypes.INIT_GAPI_FAILURE}}
}

const setIsSignedIn = (val) => {
  return {type: actionTypes.SET_IS_SIGNED_IN, signIn: {isSignedIn: val}};
}

export default {
  login,
  logout,
  setIsSignedIn,
  initGapi
};