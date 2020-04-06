import React, {useState}from 'react';
import {useSelector} from 'react-redux';
import TeamTable from './team/TeamTable';
import AddTeamModal from './team/AddTeamModal';
import DeleteTeamModal from './team/DeleteTeamModal';
import EditTeamModal from './team/EditTeamModal';
import JoinTeamModal from './team/JoinTeamModal';

const TeamManagement = () => {
  const teams = useSelector(state => state.team.teams);

  const [teamClicked, setTeamClicked] = useState({});

  return (
    <div>
      <AddTeamModal></AddTeamModal>
      <JoinTeamModal></JoinTeamModal>
      <DeleteTeamModal teamSelected={teamClicked}></DeleteTeamModal>
      <EditTeamModal teamSelected={teamClicked}></EditTeamModal>
      <div className="row">
        <div className="col">
          <h1><strong>我的戰隊</strong></h1>
        </div>
      </div>
      <div className="row">
        <div className="col-auto">
          <button className="btn btn-primary" id="btnAddTeam" data-toggle="modal" data-target="#addTeamModal">建立戰隊</button>
        </div>
        <div className="col-auto">
          <button className="btn btn-success" id="btnJoinTeam" data-toggle="modal" data-target="#joinTeamModal">加入戰隊</button>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <TeamTable teams={teams} setTeamClicked={setTeamClicked}></TeamTable>
        </div>
      </div>
    </div>
  );
}
 
export default TeamManagement;