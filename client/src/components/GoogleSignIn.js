import React from 'react';
import {Button, CircularProgress} from '@material-ui/core';
import useStyles from '../styles';
import {useDispatch, useSelector} from 'react-redux';
import authActions from '../actions/auth';
import GoogleSignInIcon from './GoogleSignInIcon';

const GoogleSignIn = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const initGoogleSignIn = () => dispatch(authActions.initGoogleSignIn());
  const loading = useSelector(state => ['INIT_GOOGLESIGNIN'].some(a => state.loading[a]));

  React.useEffect(() => {
    initGoogleSignIn();
  }, []);

  if (loading) return <CircularProgress color='inherit' />;

  return (
    <Button
      id="signIn"
      className={classes.googleSignIn}
    >
      <GoogleSignInIcon />
      <span style={{paddingLeft: "7px"}}>以 Google 登入</span>
    </Button>
  );
}

export default GoogleSignIn;

