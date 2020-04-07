import React, { useEffect, useRef } from 'react';
import TeamTableItem from './TeamTableItem';
import {OverlayScrollbarsComponent} from 'overlayscrollbars-react';
import LoadingOverlay from '../LoadingOverlay';

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
            {props.showPosition ? <th scope="col">職位</th> : null}
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <LoadingOverlay loading={props.loading}></LoadingOverlay>
          {(props.teams && props.teams.length > 0) ? (
            props.teams.map((team, index) => <TeamTableItem key={index} team={team} index={index + 1} setTeamClicked={props.setTeamClicked} showPosition={props.showPosition}></TeamTableItem>)
          ) : (
                <tr><td colSpan={props.showPosition ? '6' : '5'}>查無戰隊</td></tr>
          )}
        </tbody>
      </table>
    </div>
    </OverlayScrollbarsComponent>
  );
}

export default TeamTable;