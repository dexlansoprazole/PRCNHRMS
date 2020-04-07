import React from 'react';
import {Switch, Route, Link, Redirect, useLocation} from 'react-router-dom';
import {Nav} from 'react-bootstrap';
import AddTeamModal from './team/AddTeamModal';
import SearchTeam from './team/SearchTeam';
import MyTeams from './team/MyTeams';
import Requests from './team/Requests';

const TeamManagement = () => {
  let location = useLocation();
  return (
    <>
      <AddTeamModal></AddTeamModal>
      <Nav variant="tabs" defaultActiveKey={location.pathname === '/team_management' ? '/team_management/my_teams' : location.pathname}>  {/*TODO: bug fix*/}
        <Nav.Item>
          <Link to="/team_management/my_teams" style={{textDecoration: 'none'}}>
            <Nav.Link as='div' eventKey="/team_management/my_teams" style={{color: 'black'}}>
              我的戰隊
            </Nav.Link>
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/team_management/search" style={{textDecoration: 'none'}}>
            <Nav.Link as='span' eventKey="/team_management/search" style={{color: 'black'}}>
              尋找戰隊
            </Nav.Link>
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/team_management/requests" style={{textDecoration: 'none'}}>
            <Nav.Link as='span' eventKey="/team_management/requests" style={{color: 'black'}}>
              申請中
            </Nav.Link>
          </Link>
        </Nav.Item>
      </Nav>
      <Switch>
        <Route exact path="/team_management/my_teams" component={MyTeams} />
        <Route exact path="/team_management/search" component={SearchTeam} />
        <Route exact path="/team_management/requests" component={Requests} />
        <Redirect to="/team_management/my_teams" />
      </Switch>
    </>
  );
}
 
export default TeamManagement;