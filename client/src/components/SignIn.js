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
      <div className={"nav-item nav-link align-items-center" + (isSignedIn ? " d-none" : " d-flex")} style={{width: "80px", height: "40px", padding: "4px"}}>
        <button id="signIn" className="btn btn-sm btn-light text-dark text-center align-text-top w-100 h-100 d-inline">登入</button>
      </div>
      <button className={"nav-item text-light align-items-center nav-link" + (isSignedIn ? "d-flex" : " d-none")} onClick={logout} style={{backgroundColor: "#ff000000", border: 0}}><span className="align-middle">登出</span></button>
    </div>
  );
}
 
export default SignIn;

