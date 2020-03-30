import React, { useEffect, useRef } from 'react';
import MemberTableItem from './MemberTableItem';

const MemberTable = props => {
  const tableRef = useRef(null);

  useEffect(() => {
    let $table = window.$(tableRef.current);
    $table.css('max-height', parseInt(window.$(window).height()) - $table.offset().top - 50);
    window.$(window).resize(() => $table.css('max-height', parseInt(window.$(window).height()) - $table.offset().top - 50));
  }, []);

  return (
    <div className="table-responsive" ref={tableRef}>
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
            props.members.map((member, index) => <MemberTableItem key={index} member={member} index={index + 1}></MemberTableItem>)
          ) : (
            <tr><td colSpan="7">查無成員：3</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default MemberTable;