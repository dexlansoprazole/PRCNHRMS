import React, {useState, useEffect} from 'react';
import {Button} from '@material-ui/core';
import useStyles from '../styles';
import {useDispatch} from 'react-redux';
import authActions from '../actions/auth';
import {IconNormal, IconPressed} from './GoogleSignInIcon';

const GoogleSignIn = () => {
  const classes = useStyles();
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
    <Button
      id="signIn"
      className={classes.googleSignIn}
      onMouseEnter={() => setisSignInHover(true)}
      onMouseLeave={() => setisSignInHover(false)}
    >
      {isSignInHover ? (<IconPressed></IconPressed>) : (<IconNormal></IconNormal>)}
      <span style={{paddingLeft: "7px"}}>以 Google 登入</span>
    </Button>
  );
}
 
export default GoogleSignIn;

