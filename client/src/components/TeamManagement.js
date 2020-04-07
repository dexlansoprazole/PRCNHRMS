import React, {useState} from 'react';
import {BrowserRouter, Switch, Route, Link, Redirect, useLocation} from 'react-router-dom';
import {Nav} from 'react-bootstrap';
import AddTeamModal from './team/AddTeamModal';
import JoinTeam from './team/JoinTeam';
import MyTeams from './team/MyTeams';

const TeamManagement = () => {
  let location = useLocation();
  return (
    <BrowserRouter>
      <AddTeamModal></AddTeamModal>
      <Nav variant="tabs" defaultActiveKey={location.pathname}>
        <Nav.Item>
          <Link to="/team_management/my_teams" style={{textDecoration: 'none'}}>
            <Nav.Link as='div' eventKey="/team_management/my_teams" style={{color: 'black'}}>
              我的戰隊
            </Nav.Link>
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/team_management/join_team" style={{textDecoration: 'none'}}>
            <Nav.Link as='span' eventKey="/team_management/join_team" style={{color: 'black'}}>
              加入戰隊
            </Nav.Link>
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as='span' eventKey="link-2" style={{cursor: 'pointer'}}>
            申請中
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <Switch>
        <Route exact path="/team_management/my_teams" component={MyTeams} />
        <Route exact path="/team_management/join_team" component={JoinTeam} />
        <Redirect to="/team_management/my_teams" />
      </Switch>
    </BrowserRouter>
  );
}
 
export default TeamManagement;