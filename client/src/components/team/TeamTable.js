import React, { useEffect, useRef } from 'react';
import TeamTableItem from './TeamTableItem';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

const TeamTable = props => {
  const divRef = useRef(null);

  useEffect(() => {
    let $div = window.$(divRef.current);
    $div.css('max-height', parseInt((window.$(window).height()) - $div.offset().top - 50) / 2);
    window.$(window).resize(() => $div.css('max-height', parseInt((window.$(window).height()) - $div.offset().top - 50) / 2));
  }, []);

  return (
    <OverlayScrollbarsComponent
      className='os-theme-custom'
      options={{ scrollbars: { autoHide: 'move' } }}
    >
    <div ref={divRef}>
      <table className="table table-hover">
        <thead className="thead-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">名稱</th>
            <th scope="col">隊長</th>
            <th scope="col">成員數</th>
            {props.isSearchResult ? null : <th scope="col">職位</th>}
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {(props.teams && props.teams.length > 0) ? (
            props.teams.map((team, index) => <TeamTableItem key={index} team={team} index={index + 1} setTeamClicked={props.setTeamClicked} isSearchResult={props.isSearchResult}></TeamTableItem>)
          ) : (
            props.isSearchResult ? null : <tr><td colSpan="6">查無戰隊</td></tr>
          )}
        </tbody>
      </table>
    </div>
    </OverlayScrollbarsComponent>
  );
}

export default TeamTable;