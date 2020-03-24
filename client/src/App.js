import React from 'react';
import {BrowserRouter, Switch, Route, NavLink, Redirect} from 'react-router-dom';
import { useSelector } from 'react-redux';
import './App.css';
import Home from './components/Home';
import SignIn from './components/SignIn';
import MemberManagement from './components/MemberManagement';
import TeamManagement from './components/TeamManagement';
import LoadingModal from './components/LoadingModal';
import TeamDropdown from './components/TeamDropdown';

const App = () => {
  const loading = useSelector(state => state.loading);
  const isSignedIn = useSelector(state => state.auth.isSignedIn);
  const team = useSelector(state => state.team.teamSelected);
  window.$('.modal-backdrop').remove();
  window.$('body').removeClass('modal-open');

  return (
    <div className="app">
      <BrowserRouter>
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
                {isSignedIn ? <NavLink className="nav-item nav-link" to="member_management">成員管理</NavLink> : null}
              </div>
              {(isSignedIn && Object.keys(team).length !== 0) ? <TeamDropdown></TeamDropdown> : null}
              <SignIn></SignIn>
            </div>
          </div>
        </nav>
        {loading ? (
          <LoadingModal></LoadingModal>
        ) : (
          <Switch>
            <Route exact path="/home" component={Home} />
            {isSignedIn ? <Route exact path="/team_management" component={TeamManagement} /> : null}
            {isSignedIn ? <Route exact path="/member_management" component={MemberManagement} /> : null}
            <Redirect to="/home" />
          </Switch>
        )}
        
      </BrowserRouter>
    </div>
  );
}

export default App;
