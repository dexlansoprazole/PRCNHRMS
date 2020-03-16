import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import signInActions from '../actions/signIn';

const SignIn = () => {
  const dispatch = useDispatch();
  const isSignedIn = useSelector(state => state.signIn.isSignedIn);
  const user = useSelector(state => state.user);
  const initGapi = () => dispatch(signInActions.initGapi());
  const logout = () => dispatch(signInActions.logout());

  useEffect(() => {
    window.gapi.load('auth2', () => {
      initGapi();
    });
  });

  return (
    <div className="navbar-nav">
      <div className={"nav-item align-items-center" + (isSignedIn ? " d-none" : " d-flex")} style={{width: "80px", height: "40px", padding: "4px"}}>
        <button id="signIn" className="btn btn-sm btn-light text-dark text-center align-text-top w-100 h-100 d-inline">登入</button>
      </div>
      <div className={"nav-item text-light text-center align-items-center" + (isSignedIn ? " d-flex" : " d-none")} style={{height: "40px", padding: "4px"}}>{"您好，" + user.email}</div>
      <div className={"nav-item align-items-center" + (isSignedIn ? " d-flex" : " d-none")} style={{width: "80px", height: "40px", padding: "4px"}}>
        <button className="btn btn-sm btn-light text-dark text-center align-text-top w-100 h-100 d-inline" onClick={logout}>登出</button>
      </div>
    </div>
  );
}
 
export default SignIn;

