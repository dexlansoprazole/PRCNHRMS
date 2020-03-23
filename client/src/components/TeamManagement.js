import React from 'react';
import {useSelector} from 'react-redux';
import TeamTable from './TeamTable';
import AddTeamModal from './AddTeamModal';

const MemberManagement = () => {
  const user = useSelector(state => state.user);
  const teams = useSelector(state => state.team.teams).filter(t => t.leader === user._id);

  return (
    <div className="container">
      <AddTeamModal></AddTeamModal>
      <div className="row">
        <div className="col">
          <h1>我的戰隊</h1>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <button className="btn btn-primary" id="btnAddTeam" data-toggle="modal" data-target="#addTeamModal">建立戰隊</button>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <TeamTable teams={teams}></TeamTable>
        </div>
      </div>
    </div>
  );
}
 
export default MemberManagement;