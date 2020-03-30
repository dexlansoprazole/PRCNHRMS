import React, { useEffect, useRef } from 'react';
import TeamTableItem from './TeamTableItem';

const TeamTable = props => {
  const tableRef = useRef(null);

  useEffect(() => {
    let $table = window.$(tableRef.current);
    $table.css('max-height', parseInt((window.$(window).height()) - $table.offset().top - 50) / 2);
    window.$(window).resize(() => $table.css('max-height', parseInt((window.$(window).height()) - $table.offset().top - 50) / 2));
  }, []);

  return (
    <div className="table-responsive" ref={tableRef}>
      <table className="table table-hover">
        <thead className="thead-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">名稱</th>
            <th scope="col">隊長</th>
            <th scope="col">成員數</th>
            <th scope="col">職位</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {(props.teams && props.teams.length > 0) ? (
            props.teams.map((team, index) => <TeamTableItem key={index} team={team} index={index + 1} setTeamClicked={props.setTeamClicked}></TeamTableItem>)
          ) : (
              <tr><td colSpan="4">您還沒有戰隊：3</td></tr>
            )}
        </tbody>
      </table>
    </div>
  );
}

export default TeamTable;