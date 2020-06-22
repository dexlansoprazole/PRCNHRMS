import React from 'react';
import {Box, Avatar, Popper, ClickAwayListener, Grow, Paper, IconButton, MenuList, Button, Divider} from '@material-ui/core';
import useStyles from '../styles';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import authActions from '../actions/auth';

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

  function handleListKeyDown(event) {
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
        <Avatar src={user.pictureUrl}/>
      </IconButton>
      
      <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
        {({TransitionProps, placement}) => (
          <Grow
            {...TransitionProps}
            style={{transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'}}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown} className={classes.noOutline}>
                  <Box px={2} py={1} className={classes.noOutline}>
                    <Box display='flex' alignItems="center" mb={2}>
                      <img src={user.pictureUrl} style={{verticalAlign: 'middle', width: 40, height: 40, borderRadius: '50%'}} alt=''></img>
                      <Box ml={2}>
                        <Box fontSize={18} fontWeight="fontWeightBold">{user.name}</Box>
                        <Box fontSize={12} color='text.secondary'>{user.email}</Box>
                      </Box>
                    </Box>
                    <Divider></Divider>
                    <Box mt={2} display="flex" justifyContent="flex-end">
                      <Button size="small" variant="contained" disableElevation onClick={signOut}>登出</Button>
                    </Box>
                  </Box>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}
 
export default AccountDropdown;