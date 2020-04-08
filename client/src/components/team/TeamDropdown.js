import React, {useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';
import TeamDropdownItem from './TeamDropdownItem';

const TeamDropdown = (props) => {
  const teams = useSelector(state => state.teams);
  const teamSelected = props.team;
  const dropdownRef = useRef(null);

  useEffect(() => {
    let $dropdown = window.$(dropdownRef.current);
    $dropdown.on('show.bs.dropdown', function() {
      window.$(this).find('.dropdown-menu').first().stop(true, true).slideDown('fast');
    });

    $dropdown.on('hide.bs.dropdown', function() {
      window.$(this).find('.dropdown-menu').first().stop(true, true).slideUp('fast');
    });
  },[]);

  return (
    <div className="dropdown d-inline-block mb-2" ref={dropdownRef}>
      <h1 className="dropdown-toggle m-0" data-toggle="dropdown" style={{cursor: 'pointer', userSelect: 'none'}}><strong>{teamSelected.name}</strong></h1>
      <div className="dropdown-menu w-100" style={{marginTop: 8, minWidth: 'fit-content'}}>
        <h6 className="dropdown-header">戰隊選擇</h6>
        {
          teams.map((team, index) => <TeamDropdownItem key={index} team={team} index={(index+1)}></TeamDropdownItem>)
        }
      </div>
    </div>
  );
}
 
export default TeamDropdown;