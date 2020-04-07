import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import DeleteTeamModal from './DeleteTeamModal';
import EditTeamModal from './EditTeamModal';
import TeamTable from './TeamTable';

const MyTeams = () => {
  const teams = useSelector(state => state.team.teams);

  const [teamClicked, setTeamClicked] = useState({});

  return (
    <>
      <DeleteTeamModal teamSelected={teamClicked}></DeleteTeamModal>
      <EditTeamModal teamSelected={teamClicked}></EditTeamModal>
      <div className="row">
        <div className="col-auto">
          <button className="btn btn-primary" id="btnAddTeam" data-toggle="modal" data-target="#addTeamModal">建立戰隊</button>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <TeamTable teams={teams} setTeamClicked={setTeamClicked} showPosition></TeamTable>
        </div>
      </div>
    </>
  );
}

export default MyTeams;
