import signInService from '../services/authService';
import {actionTypes} from '../constants';
import teamActions from './team';
import memberActions from './member';

const signIn = (googleUser) => { //TODO: use middleware
  return async (dispatch, getState) => {
    dispatch(request());
    try {
      const id_token = googleUser.getAuthResponse().id_token;
      const user = (await signInService.signIn(id_token)).user;
      await dispatch(teamActions.getTeams({leader: user._id}));
      let team = localStorage.getItem('teamSelected');
      if (team)
        team = getState().team.teams.find(t => (t._id === team)) || getState().team.teams.find(t => (t.leader._id === user._id)) || null;
      else
        team = getState().team.teams.find(t => (t.leader._id === user._id)) || null;
      if (team) {
        dispatch(teamActions.setTeamSelected(team));
        const query = getState().team.teams.map(m => ({team: m._id}));
        await dispatch(memberActions.getMembers({$or: query}))
      }
      dispatch(success(user));
    } catch (error) {
      console.error(error);
      dispatch(failure());
      dispatch(signOut());
    }
  }

  function request() {return {type: actionTypes.LOGIN_REQUEST}}
  function success(user) {return {type: actionTypes.LOGIN_SUCCESS, user}}
  function failure() {return {type: actionTypes.LOGIN_FAILURE}}
}

const signOut = () => { //TODO: use middleware
  return async dispatch => {
    dispatch(request());
    const auth2 = window.gapi.auth2.getAuthInstance();
    try {
      await auth2.signOut();
      signInService.signOut();
    } catch (error) {
      console.error(error);
      dispatch(failure());
    }
    dispatch(success());
  }

  function request() {return {type: actionTypes.LOGOUT_REQUEST}}
  function success() {return {type: actionTypes.LOGOUT_SUCCESS}}
  function failure() {return {type: actionTypes.LOGOUT_FAILURE}}
}

const initAuth = () => {
  return async dispatch => {
    dispatch(request());
    try {
      const auth2 = await window.gapi.auth2.init({client_id: process.env.REACT_APP_CLIENT_ID});
      if (auth2.isSignedIn.get() === true)
        await dispatch(signIn(auth2.currentUser.get()))
      auth2.attachClickHandler(window.$('#signIn').get(0), {},
      async (googleUser) => {
        await dispatch(signIn(googleUser));
      },
      (error) => {
        dispatch(failure());
      });
    } catch (error) {
      console.error(error);
      dispatch(failure());
    }
    dispatch(success());
  }

  function request() {return {type: actionTypes.INIT_AUTH_REQUEST}}
  function success() {return {type: actionTypes.INIT_AUTH_SUCCESS}}
  function failure() {return {type: actionTypes.INIT_AUTH_FAILURE}}
}

const setIsSignedIn = (val) => {
  return {type: actionTypes.SET_IS_SIGNED_IN, isSignedIn: val};
}

export default {
  signIn,
  signOut,
  setIsSignedIn,
  initAuth
};