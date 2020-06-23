import React from 'react';
import clsx from 'clsx';
import {BrowserRouter, Switch, Route, Redirect, Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {AppBar, Toolbar, IconButton, Typography, Drawer, Divider, List, ListItem, ListItemText, Collapse, Grid, createMuiTheme, MuiThemeProvider} from '@material-ui/core';
import useStyles from './styles';
import {Menu, ChevronLeft, ChevronDown, ChevronUp} from 'react-feather';
import './App.css';
import SelectTeamButton from './components/select_team/SelectTeamButton';
import Home from './components/Home';
import AccountDropdown from './components/AccountDropdown';
import GoogleSignIn from './components/GoogleSignIn';
import MemberManagement from './components/team/MemberManagement'
import LoadingOverlay from './components/LoadingOverlay';
import ScrollBarAdapter from './components/ScrollBarAdapter';
import authActions from './actions/auth';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1565c0",
    },
    secondary: {
      main: "#29b6f6",
      contrastText: '#fff'
    }
  },
  props: {
    MuiButtonBase: {
      disableRipple: false,
    },
  }
});

const App = () => {
  const classes = useStyles(theme);
  const dispatch = useDispatch();
  const signIn = () => dispatch(authActions.signIn());
  const initialized = useSelector(state => state.initialized);
  const loading = useSelector(state => state.loading);
  const isSignedIn = useSelector(state => state.auth.isSignedIn);
  const teamSelected = useSelector(state => state.teamSelected);
  const refLink = React.forwardRef((props, ref) => <div ref={ref}><Link {...props} /></div>)

  const [drawerOpen, setDrawerOpen] = React.useState(true);
  const [teamCollapseOpen, setTeamCollapseOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };
  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };
  const handleCollapseClick = () => {
    setTeamCollapseOpen(!teamCollapseOpen);
  };

  React.useEffect(() => {
    signIn();
  }, []);

  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <BrowserRouter>
          <LoadingOverlay loading={loading} global />

          <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
              [classes.appBarShift]: drawerOpen,
            })}
          >
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleDrawerOpen}
                className={clsx(classes.menuButton, {
                  [classes.hide]: drawerOpen,
                })}
              >
                <Menu />
              </IconButton>
              <Grid container alignItems='center' justify="space-between" spacing={3}>
                <Grid item>
                  <Grid container alignItems='center' spacing={2}>
                    <Grid item>
                      <Typography variant="h6">
                        PRCNHRMS
                    </Typography>
                    </Grid>
                    <Grid item>
                      {initialized ? isSignedIn ? <SelectTeamButton /> : null : null}
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
            variant="permanent"
            className={clsx(classes.drawer, {
              [classes.drawerOpen]: drawerOpen,
              [classes.drawerClose]: !drawerOpen,
            })}
            classes={{
              paper: clsx({
                [classes.drawerOpen]: drawerOpen,
                [classes.drawerClose]: !drawerOpen,
              }),
            }}
          >
            <div className={classes.toolbar}>
              <IconButton onClick={handleDrawerClose}>
                <ChevronLeft></ChevronLeft>
              </IconButton>
            </div>
            <Divider />
            <List>
              <ListItem button component={refLink} to='/home'>
                <ListItemText primary='Home' />
              </ListItem>
              {isSignedIn ?
                <>
                  <ListItem button onClick={handleCollapseClick}>
                    <ListItemText primary="戰隊管理" />
                    {teamCollapseOpen ? <ChevronUp /> : <ChevronDown />}
                  </ListItem>
                  <Collapse in={teamCollapseOpen} timeout="auto" unmountOnExit>
                    <ListItem button component={refLink} to={'/team/member/' + teamSelected._id} className={classes.nested}>
                      <ListItemText primary='成員管理' />
                    </ListItem>
                    <ListItem button component={refLink} to={'/team/permission/' + teamSelected._id} className={classes.nested}>
                      <ListItemText primary='權限管理' />
                    </ListItem>
                  </Collapse>
                </>
                : null}
            </List>
          </Drawer>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Switch>
              <Route exact path="/home" component={Home} />
              {initialized ? isSignedIn ? <Route path="/team/member/:team_id" component={MemberManagement} /> : null : <Route path="/team/member/:team_id" />}
              <Redirect to="/home" />
            </Switch>
          </main>
        </BrowserRouter>
        <ScrollBarAdapter></ScrollBarAdapter>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
