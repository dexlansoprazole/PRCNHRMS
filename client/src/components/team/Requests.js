import React from 'react';
import {useSelector} from 'react-redux';
import TeamTable from './TeamTable';

const Requests = () => {
  const requests = useSelector(state => state.auth.user.requests);

  return (
    <div className="row">
      <div className="col">
        <TeamTable teams={requests}></TeamTable>
      </div>
    </div>
  );
}

export default Requests;
