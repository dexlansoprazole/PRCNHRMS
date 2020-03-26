import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import TeamDropdownItem from './TeamDropdownItem';

const TeamDropdown = () => {
  const teams = useSelector(state => state.team.teams);
  const teamSelected = useSelector(state => state.team.teamSelected);

  useEffect(() => {
    window.$('.dropdown').on('show.bs.dropdown', function() {
      window.$(this).find('.dropdown-menu').first().stop(true, true).slideDown('fast');
    });

    window.$('.dropdown').on('hide.bs.dropdown', function() {
      window.$(this).find('.dropdown-menu').first().stop(true, true).slideUp('fast');
    });
  });

  return (
    <div className="dropdown" id="teamDropdown">
      <h1 className="dropdown-toggle text-dark" data-toggle="dropdown">{teamSelected.name}</h1>
      <div className="dropdown-menu">
        <h6 className="dropdown-header">戰隊選擇</h6>
        {
          teams.map((team, index) => <TeamDropdownItem key={index} team={team} index={(index+1)}></TeamDropdownItem>)
        }
      </div>
    </div>
  );
}
 
export default TeamDropdown;