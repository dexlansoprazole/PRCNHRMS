import React from 'react';
import MemberTableItem from './MemberTableItem';

const MemberTable = props => {
  return (
    <table className="table table-hover">
      <thead>
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
          props.members.map((member, index) => <MemberTableItem key={member._id} member={member} index={index + 1}></MemberTableItem>)
        ) : (
          <tr><td colSpan="7">查無成員：3</td></tr>
        )}
      </tbody>
    </table>
  );
}

export default MemberTable;