import React from 'react';
import {useHistory} from 'react-router-dom'

const TeamDropdownItem = (props) => {
  const history = useHistory()

  return (
    <button className="dropdown-item" onClick={() => history.push('/team/' + props.team._id)}>{props.team.name}</button>
  );
}
 
export default TeamDropdownItem