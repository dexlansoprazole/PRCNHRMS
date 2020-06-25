import React from 'react';
import clsx from 'clsx';
import {BrowserRouter, Switch, Route, Redirect, Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {AppBar, Toolbar, IconButton, Typography, Drawer, Backdrop, List, ListItem, ListItemText, Collapse, Grid, createMuiTheme, MuiThemeProvider} from '@material-ui/core';
import useStyles from './styles';
import {Menu, ChevronDown, ChevronUp} from 'react-feather';
import SelectTeamButton from './components/select_team/SelectTeamButton';
import Home from './components/Home';
import AccountDropdown from './components/AccountDropdown';
import GoogleSignIn from './components/GoogleSignIn';
import MemberManagement from './components/team/MemberManagement'
import LoadingOverlay from './components/LoadingOverlay';
import authActions from './actions/auth';
import {useWindowResize} from './components/useWindowResize';
import SelectTeamDialog from './components/select_team/SelectTeamDialog';
import './App.css';

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

const usePrevious = (value) => {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const App = () => {
  const {width} = useWindowResize();
  const classes = useStyles(theme);
  const dispatch = useDispatch();
  const signIn = () => dispatch(authActions.signIn());
  const initialized = useSelector(state => state.initialized);
  const loading = useSelector(state => state.loading);
  const isSignedIn = useSelector(state => state.auth.isSignedIn);
  const teamSelected = useSelector(state => state.teamSelected);
  const refLink = React.forwardRef((props, ref) => <div ref={ref} onClick={width < theme.breakpoints.values.md ? handleDrawerClose : null}><Link {...props} /></div>);

  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [teamCollapseOpen, setTeamCollapseOpen] = React.useState(true);
  const [openSelectTeamDialog, setOpenSelectTeamDialog] = React.useState(false);
  const prevOpenSelectTeamDialog = usePrevious(openSelectTeamDialog);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  }

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  }

  const handleSelectTeamButtonOpen = () => {
    setOpenSelectTeamDialog(true);
  }

  const handleCollapseClick = () => {
    setTeamCollapseOpen(!teamCollapseOpen);
  };

  React.useEffect(() => {
    signIn();
  }, []);

  React.useEffect(() => {
    setOpenSelectTeamDialog(prevOpenSelectTeamDialog ? prevOpenSelectTeamDialog : false);
    if (typeof prevOpenSelectTeamDialog !== 'undefined' && !teamSelected._id) setOpenSelectTeamDialog(true);
  }, [teamSelected]);

  React.useLayoutEffect(() => {
    setDrawerOpen(width > theme.breakpoints.values.md ? true : false);
  }, [width]);

  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
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
                            disableBackdropClick={teamSelected._id ? false : true}
                            disableEscapeKeyDown={teamSelected._id ? false : true}

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
            variant="permanent"
            className={clsx(classes.drawer, {
              [classes.drawerOpen]: drawerOpen,
              [classes.drawerClose]: !drawerOpen,
            })}
            classes={{
              paper: clsx(classes.drawerPaper, {
                [classes.drawerOpen]: drawerOpen,
                [classes.drawerClose]: !drawerOpen,
              }),
            }}
          >
            <List>
              <ListItem button component={refLink} to='/home'>
                <ListItemText primary='Home' />
              </ListItem>
              {isSignedIn && teamSelected._id ?
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
          {
            width < theme.breakpoints.values.md ?
              <Backdrop
                open={drawerOpen}
                onClick={handleDrawerClose}
                classes={{
                  root: classes.drawerBackdrop
                }}
              />
              : null
          }
          <div style={{width: '100%'}}>
            <LoadingOverlay global loading={loading} className={clsx({
              [classes.loadingOverlayDrawerClose]: !drawerOpen,
              [classes.loadingOverlayDrawerOpen]: drawerOpen,
            })}/>
            <main className={classes.content}>
              <div className={classes.toolbar} />
              <Switch>
                <Route exact path="/home" component={Home} />
                {initialized ? isSignedIn ? <Route path="/team/member/:team_id" component={MemberManagement} /> : null : <Route path="/team/member/:team_id" />}
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
