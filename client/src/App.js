import React, {useEffect} from 'react';
import {BrowserRouter, Switch, Route, NavLink, Redirect} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import './App.scss';
import './osTheme.scss';
import Home from './components/Home';
import AccountDropdown from './components/AccountDropdown';
import GoogleSignIn from './components/GoogleSignIn';
import MyTeams from './components/my_teams/MyTeams';
import Team from './components/team/Team';
import LoadingOverlay from './components/LoadingOverlay';
import ScrollBarAdapter from './components/ScrollBarAdapter';
import Alerts from './components/Alerts'
import authActions from './actions/auth';

const App = () => {
  const dispatch = useDispatch();
  const signIn = () => dispatch(authActions.signIn());
  const initialized = useSelector(state => state.initialized);
  const loading = useSelector(state => state.loading);
  const isSignedIn = useSelector(state => state.auth.isSignedIn);

  useEffect(() => {
    signIn();
  }, []);

  return (
    <div className="app">
      <BrowserRouter>
        <LoadingOverlay loading={loading} global></LoadingOverlay>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
          <div className="container">
            <div className="navbar-nav mr-auto">
              <NavLink className="nav-item nav-link" to="/home">Home</NavLink>
              {isSignedIn ? <NavLink className="nav-item nav-link" to="/my_teams">我的戰隊</NavLink> : null}
            </div>
            <div className="navbar-nav">
              {initialized ? isSignedIn ? null : <GoogleSignIn></GoogleSignIn> : null}
              {initialized ? isSignedIn ? <AccountDropdown></AccountDropdown> : null : null}
            </div>
          </div>
        </nav>
        <div className="container">
          <Alerts></Alerts>
          <Switch>
            <Route exact path="/home" component={Home} />
            {initialized ? isSignedIn ? <Route path="/my_teams" component={MyTeams} /> : null : <Route path="/my_teams" />}
            {initialized ? isSignedIn ? <Route path="/team/:team_id" component={Team} /> : null : <Route path="/team/:team_id" />}
            <Redirect to="/home" />
          </Switch>
        </div>
      </BrowserRouter>
      <ScrollBarAdapter></ScrollBarAdapter>
    </div>
  );
}

export default App;
