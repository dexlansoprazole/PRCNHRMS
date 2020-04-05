import React, {useEffect} from 'react';
import {BrowserRouter, Switch, Route, NavLink, Redirect} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import './App.scss';
import './osTheme.scss';
import Home from './components/Home';
import AccountDropdown from './components/AccountDropdown';
import GoogleSignIn from './components/GoogleSignIn';
import MemberManagement from './components/MemberManagement';
import TeamManagement from './components/TeamManagement';
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
  const team = useSelector(state => state.team.teamSelected);

  useEffect(() => {
    signIn();
  }, []);

  return (
    <div className="app">
      <BrowserRouter>
        <LoadingOverlay loading={loading} global={true}></LoadingOverlay>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
          <div className="container">
            <div className="navbar-nav mr-auto">
              <NavLink className="nav-item nav-link" to="home">Home</NavLink>
              {isSignedIn ? <NavLink className="nav-item nav-link" to="team_management">戰隊管理</NavLink> : null}
              {isSignedIn && Object.keys(team).length !== 0 ? <NavLink className="nav-item nav-link" to="member_management">成員管理</NavLink> : null}
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
            {initialized ? isSignedIn ? <Route exact path="/team_management" component={TeamManagement} /> : null : <Route exact path="/team_management" />}
            {initialized ? isSignedIn && Object.keys(team).length !== 0 ? <Route exact path="/member_management" component={MemberManagement} />: null : <Route exact path="/member_management" />}
            <Redirect to="/home" />
          </Switch>
        </div>
      </BrowserRouter>
      <ScrollBarAdapter></ScrollBarAdapter>
    </div>
  );
}

export default App;
