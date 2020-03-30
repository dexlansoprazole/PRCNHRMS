import React, {useState}from 'react';
import {useSelector} from 'react-redux';
import TeamTable from './team/TeamTable';
import AddTeamModal from './team/AddTeamModal';
import DeleteTeamModal from './team/DeleteTeamModal';

const TeamManagement = () => {
  const teams = useSelector(state => state.team.teams);

  const [teamClicked, setTeamClicked] = useState({});

  return (
    <div>
      <AddTeamModal></AddTeamModal>
      <DeleteTeamModal teamSelected={teamClicked}></DeleteTeamModal>
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
          <TeamTable teams={teams} setTeamClicked={setTeamClicked}></TeamTable>
        </div>
      </div>
    </div>
  );
}
 
export default TeamManagement;