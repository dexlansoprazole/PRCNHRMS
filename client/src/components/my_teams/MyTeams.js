import React, {useState} from 'react';
import {Nav} from 'react-bootstrap';
import AddTeamModal from './AddTeamModal';
import SearchTeam from './SearchTeam';
import Teams from './Teams';
import Requests from './Requests';

const MyTeams = () => {
  const tabs = {
    TEAMS: 'TEAMS',
    SEARCH: 'SEARCH',
    REQUESTS: 'REQUESTS'
  }

  const [tabSelected, setTabSelected] = useState(tabs.TEAMS);

  const renderTab = () => {
    switch (tabSelected) {
      case tabs.TEAMS:
        return <Teams></Teams>;
      case tabs.SEARCH:
        return <SearchTeam></SearchTeam>;
      case tabs.REQUESTS:
        return <Requests></Requests>;
      default:
        return <Teams></Teams>;
    }
  }

  return (
    <>
      <AddTeamModal></AddTeamModal>
      <Nav variant="tabs" defaultActiveKey={tabs.TEAMS} onSelect={eventKey => setTabSelected(eventKey)}>
        <Nav.Item>
          <Nav.Link as='span' eventKey={tabs.TEAMS} style={{color: 'black', cursor: 'pointer'}}>
            我的戰隊
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as='span' eventKey={tabs.SEARCH} style={{color: 'black', cursor: 'pointer'}}>
            尋找戰隊
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as='span' eventKey={tabs.REQUESTS} style={{color: 'black', cursor: 'pointer'}}>
            申請中
          </Nav.Link>
        </Nav.Item>
      </Nav>
      {renderTab()}
    </>
  );
}
 
export default MyTeams;