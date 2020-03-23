import React from 'react';
import {useDispatch} from 'react-redux';
import teamActions from '../actions/team';

const TeamDropdownItem = (props) => {
  const dispatch = useDispatch();
  const setTeamSelected = team => dispatch(teamActions.setTeamSelected(team));

  return (
    <button className="dropdown-item" onClick={() => setTeamSelected(props.team)}>{props.team.name}</button>
  );
}
 
export default TeamDropdownItem