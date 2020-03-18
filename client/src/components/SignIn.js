import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import signInActions from '../actions/signIn';
import {IconNormal, IconPressed} from './GoogleSignInIcon';

const SignIn = () => {
  const dispatch = useDispatch();
  const isSignedIn = useSelector(state => state.signIn.isSignedIn);
  const user = useSelector(state => state.user);
  const initGapi = () => dispatch(signInActions.initGapi());
  const logout = () => dispatch(signInActions.logout());

  const [isSignInHover, setisSignInHover] = useState(false);

  useEffect(() => {
    window.gapi.load('auth2', () => {
      initGapi();
    });
  }, []);

  const signInStyle = {
    paddingTop: '4px',
    paddingRight: '11px',
    paddingBottom: '4px',
    paddingLeft: '4px',
    border: "0",
    fontFamily: "Roboto",
    backgroundColor: isSignInHover ? "#EEEEEE" : "#FFFFFF"
  }

  return (
    <div className="navbar-nav">
      <div className={"nav-item align-items-center" + (isSignedIn ? " d-none" : " d-flex")}>
        <button id="signIn" className="btn btn-sm text-dark align-items-center w-100 h-100 d-flex" style={signInStyle} onMouseEnter={() => setisSignInHover(true)} onMouseLeave={() => setisSignInHover(false)}>
          {isSignInHover ? (<IconPressed></IconPressed>) : (<IconNormal></IconNormal>) }
          <span style={{paddingLeft: "7px"}}>以 Google 登入</span>
        </button>
      </div>
      <div className={"nav-item text-light text-center align-items-center" + (isSignedIn ? " d-flex" : " d-none")} style={{height: "40px", padding: "4px"}}>{"您好，" + user.email}</div>
      <div className={"nav-item align-items-center" + (isSignedIn ? " d-flex" : " d-none")} style={{width: "80px", height: "40px", padding: "4px"}}>
        <button className="btn btn-sm btn-light text-dark text-center align-text-top w-100 h-100 d-inline" onClick={logout}>登出</button>
      </div>
    </div>
  );
}
 
export default SignIn;

