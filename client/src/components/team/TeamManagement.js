import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {Nav} from 'react-bootstrap';
import MemberManagement from './MemberManagement';
import Permissions from './Permissions';
import Requests from './Requests';

const tabs = {
  MEMBERS: 'MEMBERS',
  PERMISSIONS: 'PERMISSIONS',
  REQUESTS: 'REQUESTS'
}

const TeamManagement = () => {
  const {team_id} = useParams();
  const team = useSelector(state => state.teams).find(t => t._id === team_id);
  const user = useSelector(state => state.user);
  const [tabSelected, setTabSelected] = useState(tabs.MEMBERS);
  if (!team)
    return null;
  const role = team.users.leader._id === user._id ? 'leader' : team.users.managers.find(m => m._id === user._id) ? 'manager' : team.users.members.find(m => m._id === user._id) ? 'member' : null;

  const renderTab = () => {
    switch (tabSelected) {
      case tabs.MEMBERS:
        return <MemberManagement role={role}></MemberManagement>;
      case tabs.PERMISSIONS:
        return <Permissions></Permissions>;
      case tabs.REQUESTS:
        return <Requests></Requests>;
      default:
        return <MemberManagement></MemberManagement>;
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
              {role === "leader" || role === 'manager' ? '成員管理' : '成員清單'}
            </Nav.Link>
          </Nav.Item>
          {
            role === "leader" ?
            <>
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
            </> : 
            null
          }
        </Nav>
        {renderTab()}
      </>
    );
  else
    return null;
}

export default TeamManagement;