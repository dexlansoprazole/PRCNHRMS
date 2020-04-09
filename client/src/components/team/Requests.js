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
        <div class="list-group">
          {requests.map(r => 
            <UserItem user={r} buttons={<RequestButtons></RequestButtons>}></UserItem>
          )}
        </div>
      </div>
    </div>
  );
}

export default Requests;
