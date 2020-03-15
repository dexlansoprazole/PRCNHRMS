import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import signInActions from '../actions/signIn';

const SignIn = () => {
  const dispatch = useDispatch();
  const isSignedIn = useSelector(state => state.signIn.isSignedIn);
  const initGapi = () => dispatch(signInActions.initGapi());
  const logout = () => dispatch(signInActions.logout());

  useEffect(() => {
    window.gapi.load('auth2', () => {
      initGapi();
    });
  });

  return (
    <div className="navbar-nav">
      {(!isSignedIn) ? (
        <div id="signIn" className="nav-item nav-link"></div>
      ) : (
          <button className="nav-item text-light d-flex align-items-center nav-link" onClick={logout} style={{backgroundColor: "#ff000000", border: 0}}><span className="align-middle">Sign out</span></button>
      )}
    </div>
  );
}
 
export default SignIn;

