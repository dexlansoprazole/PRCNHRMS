import React from 'react';
import {useSelector} from 'react-redux';
import TeamDropdownItem from './TeamDropdownItem';

const TeamDropdown = () => {
  const teams = useSelector(state => state.team.teams);
  const teamSelected = useSelector(state => state.team.teamSelected);

  return (
    <div className="align-items-center d-flex">
      <h1 className="dropdown-toggle text-dark align-items-center d-flex" data-toggle="dropdown">{teamSelected.name}</h1>
      <div className="dropdown-menu">
        <h6 class="dropdown-header">戰隊選擇</h6>
        {
          teams.map((team, index) => <TeamDropdownItem key={index} team={team} index={(index+1)}></TeamDropdownItem>)
        }
      </div>
    </div>
  );
}
 
export default TeamDropdown;