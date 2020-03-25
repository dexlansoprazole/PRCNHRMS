import React from 'react';
import TeamTableItem from './TeamTableItem';

const TeamTable = props => {
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">名稱</th>
          <th scope="col">成員</th>
          <th scope="col">職位</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {(props.teams && props.teams.length > 0) ? (
          props.teams.map((team, index) => <TeamTableItem key={index} team={team} index={index + 1} setTeamSelected={props.setTeamSelected}></TeamTableItem>)
        ) : (
            <tr><td colSpan="4">您還沒有戰隊：3</td></tr>
          )}
      </tbody>
    </table>
  );
}

export default TeamTable;