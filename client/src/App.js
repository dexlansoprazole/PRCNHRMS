import React, {Component} from 'react';
import {BrowserRouter, Switch, Route, NavLink} from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import MemberManagement from './components/MemberManagement';

class App extends Component {
  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
                aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <NavLink className="nav-item nav-link" to="home">Home</NavLink>
                    <NavLink className="nav-item nav-link" to="member_management">成員管理</NavLink>
                </div>
              </div>
            </div>
          </nav>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/home" component={Home} />
            <Route path="/member_management" component={MemberManagement} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
