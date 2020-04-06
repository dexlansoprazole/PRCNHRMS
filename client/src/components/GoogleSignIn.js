import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import authActions from '../actions/auth';
import {IconNormal, IconPressed} from './GoogleSignInIcon';

const GoogleSignIn = () => {
  const dispatch = useDispatch();
  const initGoogleSignIn = () => dispatch(authActions.initGoogleSignIn());
  const [isSignInHover, setisSignInHover] = useState(false);

  useEffect(() => {
    initGoogleSignIn();
  }, []);

  const signInStyle = {
    paddingTop: '4px',
    paddingRight: '11px',
    paddingBottom: '4px',
    paddingLeft: '4px',
    border: "0",
    fontFamily: "Roboto",
    backgroundColor: isSignInHover ? "#EEEEEE" : "#FFFFFF",
    transition: 'none'
  }

  return (
    <div id="signIn" className="nav-item align-items-center d-flex">
      <button className="btn btn-sm text-dark align-items-center w-100 h-100 d-flex" style={signInStyle} onMouseEnter={() => setisSignInHover(true)} onMouseLeave={() => setisSignInHover(false)}>
        {isSignInHover ? (<IconPressed></IconPressed>) : (<IconNormal></IconNormal>) }
        <span style={{paddingLeft: "7px"}}>以 Google 登入</span>
      </button>
    </div>
  );
}
 
export default GoogleSignIn;

