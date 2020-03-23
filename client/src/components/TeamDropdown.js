import React from 'react';
import {useSelector} from 'react-redux';
import TeamDropdownItem from './TeamDropdownItem';

const TeamDropdown = () => {
  const teams = useSelector(state => state.team.teams);
  const teamSelected = useSelector(state => state.team.teamSelected);

  return (
    <div className="navbar-nav">
      <div className="nav-item dropdown align-items-center d-flex">
        <a className="nav-link btn btn-light dropdown-toggle text-dark align-items-center d-flex" data-toggle="dropdown" style={{border: 0, marginRight: 4, height: 32}}>{teamSelected.name}</a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          {
            teams.map((team, index) => <TeamDropdownItem key={index} team={team} index={(index+1)}></TeamDropdownItem>)
          }
        </div>
      </div>
    </div>
  );
}
 
export default TeamDropdown;