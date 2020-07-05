import React from 'react';
import {Box, Avatar, Popper, ClickAwayListener, Paper, IconButton, MenuList, Divider, ButtonBase, Collapse, Grid, Typography, Switch} from '@material-ui/core';
import {ExitToApp, Brightness2} from '@material-ui/icons';
import useStyles from '../styles';
import {useSelector, useDispatch} from 'react-redux';
import authActions from '../actions/auth';
import {actionTypes} from '../constants';

const DarkModeSwitch = () => {
  const dispatch = useDispatch();
  const setIsDarkMode = (value) => dispatch({type: actionTypes.SET_IS_DARK_MODE, value});
  const isDarkMode = useSelector(state => state.isDarkMode);
  const [check, setCheck] = React.useState(isDarkMode);

  if (!window.localStorage) {
    console.error('localstorage not supported');
    return null;
  }

  const handleClick = () => {
    let storage = window.localStorage;
    setIsDarkMode(!check);
    storage.setItem('isDarkMode', !check);
    setCheck(!check);
  }

  return (
    <Grid container item direction='row' justify="space-between" style={{padding: '0px 8px 0px 8px'}}>
      <Grid item>
        <Box display='flex' alignItems='center' height='100%'>
          <Brightness2 style={{paddingRight: 5}} />
          <Typography variant="button">深色主題</Typography>
        </Box>
      </Grid>
      <Grid item>
        <Switch
          checked={check}
          onClick={handleClick}
          color="primary"
        />
      </Grid>
    </Grid>
  );
}

const AccountDropdown = () => {
  const classes = useStyles();
  const user = useSelector(state => state.user);
  const [open, setOpen] = React.useState(false);

  const anchorRef = React.useRef(null);

  const dispatch = useDispatch();
  const signOut = () => dispatch(authActions.signOut());

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleListKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleToggle}
      >
        <Avatar src={user.pictureUrl} />
      </IconButton>

      <Popper open={open} anchorEl={anchorRef.current} placement='bottom-end' transition keepMounted>
        {({TransitionProps}) => (
          <Collapse
            {...TransitionProps}
            timeout={150}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown} className={classes.accountMenuList}>
                  <Box p={1.5} className={classes.noOutline}>
                    <Grid container direction='column' spacing={1}>
                      <Grid container item direction='row' justify='center' spacing={1} wrap='nowrap'>
                        <Grid item>
                          <img src={user.pictureUrl} style={{verticalAlign: 'middle', width: 40, height: 40, borderRadius: '50%'}} alt='' />
                        </Grid>
                        <Grid item>
                          <Box fontSize={16} fontWeight="fontWeightBold">{user.name}</Box>
                          <Box fontSize={10} color='text.secondary'>{user.email}</Box>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Divider />
                      </Grid>
                      <Grid item style={{padding: '4px'}}>
                        <DarkModeSwitch />
                      </Grid>
                      <Grid item>
                        <Divider />
                      </Grid>
                      <Grid item>
                        <ButtonBase
                          focusRipple
                          onClick={signOut}
                          className={classes.accountMenuButton}
                        >
                          <ExitToApp style={{paddingRight: 5}} />
                          <Typography variant="button">
                            登出
                          </Typography>
                        </ButtonBase>
                      </Grid>
                    </Grid>
                  </Box>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Collapse>
        )}
      </Popper>
    </>
  );
}

export default AccountDropdown;