import React from 'react';
import clsx from 'clsx';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {AppBar, Toolbar, IconButton, Typography, Grid, createMuiTheme, MuiThemeProvider} from '@material-ui/core';
import useStyles from './styles';
import {useWindowResize} from './components/useWindowResize';
import {Menu} from 'react-feather';
import MuiAlert from './components/Alert';
import SelectTeamButton from './components/select_team/SelectTeamButton';
import Drawer from './components/Drawer';
import Home from './components/Home';
import AccountDropdown from './components/AccountDropdown';
import GoogleSignIn from './components/GoogleSignIn';
import MemberManagement from './components/team/MemberManagement';
import PermissionManagement from './components/team/PermissionManagement';
import Attendance from './components/clan_battle/Attendance';
import LoadingOverlay from './components/LoadingOverlay';
import authActions from './actions/auth';
import SelectTeamDialog from './components/select_team/SelectTeamDialog';
import {actionTypes} from './constants';
import {lightTheme, darkTheme} from './themes';
import './App.css';

const usePrevious = (value) => {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const App = () => {
  const {width} = useWindowResize();
  const dispatch = useDispatch();
  const signIn = () => dispatch(authActions.signIn());
  const setIsDarkMode = (value) => dispatch({type: actionTypes.SET_IS_DARK_MODE, value});
  const initialized = useSelector(state => state.initialized);
  const loading = useSelector(state => ['LOGIN', 'TRY_LOGIN', 'PATCH_USER'].some(a => state.loading[a]));
  const isSignedIn = useSelector(state => state.auth.isSignedIn);
  const teamSelected = useSelector(state => state.teamSelected);
  const isDarkMode = useSelector(state => state.isDarkMode);

  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [openSelectTeamDialog, setOpenSelectTeamDialog] = React.useState(false);
  const prevOpenSelectTeamDialog = usePrevious(openSelectTeamDialog);

  const theme = createMuiTheme(isDarkMode ? darkTheme : lightTheme);

  const classes = useStyles(theme);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  }

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  }

  const handleSelectTeamButtonOpen = () => {
    setOpenSelectTeamDialog(true);
  }

  React.useEffect(() => {
    const isDarkMode = window.localStorage ? (window.localStorage.getItem('isDarkMode') ? JSON.parse(window.localStorage.getItem('isDarkMode')) : false) : false;
    setIsDarkMode(isDarkMode);
    signIn();
  }, []);

  React.useEffect(() => {
    setOpenSelectTeamDialog(prevOpenSelectTeamDialog ? prevOpenSelectTeamDialog : false);
    if (typeof prevOpenSelectTeamDialog !== 'undefined' && !teamSelected) setOpenSelectTeamDialog(true);
  }, [teamSelected]);

  React.useLayoutEffect(() => {
    setDrawerOpen(width > theme.breakpoints.values.md ? true : false);
  }, [width]);

  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <MuiAlert />
        <BrowserRouter>
          <AppBar
            position="fixed"
            className={classes.appBar}
          >
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleDrawerToggle}
                className={classes.menuButton}
              >
                <Menu />
              </IconButton>
              <Grid container alignItems='center' justify="space-between" spacing={3} wrap='nowrap'>
                <Grid item>
                  <Grid container alignItems='center' spacing={2} wrap='nowrap'>
                    <Grid item>
                      <Typography variant="h6">
                        PRCNHRMS
                      </Typography>
                    </Grid>
                    <Grid item>
                      {initialized ? isSignedIn ?
                        <>
                          <SelectTeamDialog
                            open={openSelectTeamDialog}
                            setOpen={setOpenSelectTeamDialog}
                            disableBackdropClick={teamSelected ? false : true}
                            disableEscapeKeyDown={teamSelected ? false : true}
                          />
                          <SelectTeamButton
                            onClick={handleSelectTeamButtonOpen}
                          />
                        </>
                        : null : null}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  {initialized ? isSignedIn ? null : <GoogleSignIn></GoogleSignIn> : null}
                  {initialized ? isSignedIn ? <AccountDropdown></AccountDropdown> : null : null}
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
          <Drawer
            open={drawerOpen}
            onClose={handleDrawerClose}
          />
          <div style={{width: '100%', backgroundColor: theme.palette.background.default}}>
            <LoadingOverlay global loading={loading} className={clsx({
              [classes.loadingOverlayDrawerClose]: !drawerOpen,
              [classes.loadingOverlayDrawerOpen]: drawerOpen,
            })}/>
            <main className={clsx({
              [classes.contentDrawerClose]: !drawerOpen,
              [classes.contentDrawerOpen]: drawerOpen,
            })}>
              <Switch>
                <Route exact path="/home" component={Home} />
                {initialized ? isSignedIn ? <Route path="/team/member" component={MemberManagement} /> : null : <Route path="/team/member" />}
                {initialized ? isSignedIn ? <Route path="/team/permission" component={PermissionManagement} /> : null : <Route path="/team/permission" />}
                {initialized ? isSignedIn ? <Route path="/clan_battle/attendance" component={Attendance} /> : null : <Route path="/clan_battle/attendance" />}
                <Redirect to="/home" />
              </Switch>
            </main>
          </div>
        </BrowserRouter>
      </div>
    </MuiThemeProvider >
  );
}

export default App;
