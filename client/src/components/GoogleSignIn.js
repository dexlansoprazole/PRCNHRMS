import React, {useState, useEffect} from 'react';
import {Button} from '@material-ui/core';
import useStyles from '../styles';
import {useDispatch} from 'react-redux';
import authActions from '../actions/auth';
import GoogleSignInIcon from './GoogleSignInIcon';

const GoogleSignIn = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const initGoogleSignIn = () => dispatch(authActions.initGoogleSignIn());
  const [isSignInHover, setisSignInHover] = useState(false);

  useEffect(() => {
    initGoogleSignIn();
  }, []);

  return (
    <Button
      id="signIn"
      className={classes.googleSignIn}
      onMouseEnter={() => setisSignInHover(true)}
      onMouseLeave={() => setisSignInHover(false)}
      onFocus={() => setisSignInHover(true)}
    >
      <GoogleSignInIcon></GoogleSignInIcon>
      <span style={{paddingLeft: "7px"}}>以 Google 登入</span>
    </Button>
  );
}
 
export default GoogleSignIn;

