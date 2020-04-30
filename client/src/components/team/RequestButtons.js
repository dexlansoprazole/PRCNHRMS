import React from 'react';
import {useDispatch} from 'react-redux';
import {Button} from 'react-bootstrap';
import {Check, X} from 'react-feather';
import teamActions from '../../actions/team';

const RequestButtons = (props) => {
  const dispatch = useDispatch();

  return (
    <div className="d-flex align-items-center">
      <Button variant="outline-danger" style={{padding: 4, height: 36, width: 36}} onClick={() => dispatch(teamActions.deleteJoinRequest(props.team_id, props.user_id))}><X></X></Button>
      <Button variant="outline-success" style={{marginLeft: '4px', padding: 4, height: 36, width: 36}} onClick={() => dispatch(teamActions.addMember(props.team_id, props.user_id))}><Check></Check></Button>
    </div>
  );
}

export default RequestButtons;
