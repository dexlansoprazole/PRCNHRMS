import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {Nav} from 'react-bootstrap';
import Members from './Members';
import Permissions from './Permissions';
import Requests from './Requests';

const Team = () => {
  const {team_id} = useParams();
  const team = useSelector(state => state.teams).find(t => t._id === team_id);

  const tabs = {
    MEMBERS: 'MEMBERS',
    PERMISSIONS: 'PERMISSIONS',
    REQUESTS: 'REQUESTS'
  }

  const [tabSelected, setTabSelected] = useState(tabs.MEMBERS);

  const renderTab = () => {
    switch (tabSelected) {
      case tabs.MEMBERS:
        return <Members></Members>;
      case tabs.PERMISSIONS:
        return <Permissions></Permissions>;
      case tabs.REQUESTS:
        return <Requests></Requests>;
      default:
        return <Members></Members>;
    }
  }

  if (team)
    return (
      <>
        <div className="row">
          <div className="col">
            <h1><strong>{team.name}</strong></h1>
          </div>
        </div>
        <Nav variant="tabs" defaultActiveKey={tabs.MEMBERS} onSelect={eventKey => setTabSelected(eventKey)}>
          <Nav.Item>
            <Nav.Link as='span' eventKey={tabs.MEMBERS} style={{color: 'black', cursor: 'pointer'}}>
              成員管理
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as='span' eventKey={tabs.PERMISSIONS} style={{color: 'black', cursor: 'pointer'}}>
              權限管理
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
  else
    return null;
}

export default Team;