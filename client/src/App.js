import React from 'react';
import {BrowserRouter, Switch, Route, NavLink, Redirect} from 'react-router-dom';
import { useSelector } from 'react-redux';
import './App.css';
import Home from './components/Home';
import SignIn from './components/SignIn';
import MemberManagement from './components/MemberManagement';
import LoadingModal from './components/LoadingModal';

const App = () => {
  const loading = useSelector(state => state.loading);
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
            <div className="navbar-collapse collapse justify-content-between" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <NavLink className="nav-item nav-link" to="home">Home</NavLink>
                <NavLink className="nav-item nav-link" to="member_management">成員管理</NavLink>
              </div>
                <SignIn></SignIn>
            </div>
          </div>
        </nav>
        {loading ? (
          <LoadingModal></LoadingModal>
        ) : (
          <Switch>
            <Route exact path="/home" component={Home} />
            <Route exact path="/member_management" component={MemberManagement} />
            <Redirect to="/home" />
          </Switch>
        )}
        
      </BrowserRouter>
    </div>
  );
}

export default App;
