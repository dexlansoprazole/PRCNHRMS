import React from 'react';
import {useDispatch} from 'react-redux';
import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {Button} from 'react-bootstrap';
import {X} from 'react-feather';
import UserItem from './UserItem';
import teamActions from '../../actions/team';

const Permissions = () => {
  const dispatch = useDispatch();
  const {team_id} = useParams();
  const team = useSelector(state => state.teams).find(t => t._id === team_id);
  const users = [{...team.users.leader, role: 'leader'}].concat(team.users.managers.map(m => ({...m, role: 'manager'})), team.users.members.map(m => ({...m, role: 'member'})));

  return (
    <div className="row">
      <div className="col">
        <div className="list-group">
          {users.map(r =>
            <UserItem key={r._id} user={r} buttons={<Button variant="outline-danger" style={{padding: 4, height:36, width: 36}} onClick={() => dispatch(teamActions.deleteMember(team_id, r._id))}><X></X></Button>}></UserItem>
          )}
        </div>
      </div>
    </div>
  );
}

export default Permissions;
