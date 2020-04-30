import React from 'react';
import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import UserItem from './UserItem';
import RequestButtons from './RequestButtons';

const Requests = () => {
  const {team_id} = useParams();
  const requests = useSelector(state => state.teams).find(t => t._id === team_id).users.requests;

  return (
    <div className="row">
      <div className="col">
        <div className="list-group">
          {requests.map(r => 
            <UserItem key={r._id} user={r} buttons={<RequestButtons team_id={team_id} user_id={r._id}></RequestButtons>}></UserItem>
          )}
        </div>
      </div>
    </div>
  );
}

export default Requests;