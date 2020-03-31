import React from 'react';
import {BrowserRouter, Switch, Route, NavLink, Redirect} from 'react-router-dom';
import { useSelector } from 'react-redux';
import './App.scss';
import './osTheme.scss';
import Home from './components/Home';
import SignIn from './components/SignIn';
import MemberManagement from './components/MemberManagement';
import TeamManagement from './components/TeamManagement';
import LoadingOverlay from './components/LoadingOverlay';
import Toasts from './components/Toasts';
import ScrollBarAdapter from './components/ScrollBarAdapter';
import Alerts from './components/Alerts'

const App = () => {
  const initialized = useSelector(state => state.initialized);
  const loading = useSelector(state => state.loading);
  const isSignedIn = useSelector(state => state.auth.isSignedIn);
  const team = useSelector(state => state.team.teamSelected);

  return (
    <div className="app">
      <BrowserRouter>
        <LoadingOverlay loading={loading} global={true}></LoadingOverlay>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
              aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="navbar-collapse collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav mr-auto">
                <NavLink className="nav-item nav-link" to="home">Home</NavLink>
                {isSignedIn ? <NavLink className="nav-item nav-link" to="team_management">戰隊管理</NavLink> : null}
                {isSignedIn && Object.keys(team).length !== 0 ? <NavLink className="nav-item nav-link" to="member_management">成員管理</NavLink> : null}
              </div>
              <SignIn></SignIn>
            </div>
          </div>
        </nav>
        <div className="container">
          <Toasts></Toasts>
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
