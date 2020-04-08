import React, { useEffect, useRef } from 'react';
import MemberTableItem from './MemberTableItem';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

const MemberTable = props => {
  const divRef = useRef(null);


  useEffect(() => {
    let $div = window.$(divRef.current);
    $div.css('max-height', parseInt(window.$(window).height()) - $div.offset().top - 50);
    window.$(window).resize(() => $div.css('max-height', parseInt(window.$(window).height()) - $div.offset().top - 50));
  }, []);

  return (
    <OverlayScrollbarsComponent
      className='os-theme-custom'
      options={{ scrollbars: { autoHide: 'move'}}} 
    >
    <div ref={divRef}>
      <table className="table table-hover">
        <thead className="thead-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">ID</th>
            <th scope="col">暱稱</th>
            <th scope="col">加入日期</th>
            <th scope="col">退出日期</th>
            <th scope="col">踢除原因</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {(props.members && props.members.length > 0) ? (
              props.members.map((member, index) => <MemberTableItem key={index} member={member} index={index + 1} setMemberClicked={props.setMemberClicked}></MemberTableItem>)
          ) : (
            <tr><td colSpan="7">查無成員：3</td></tr>
          )}
        </tbody>
      </table>
    </div>
    </OverlayScrollbarsComponent>
  );
}

export default MemberTable;