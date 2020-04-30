import React from 'react';
import {Badge} from 'react-bootstrap';

const UserItem = (props) => {
  const user = props.user;
  const buttons = props.buttons;

  return (
    <div className="d-flex justify-content-between list-group-item align-items-center user-item">
      <div className="d-flex text-nowrap align-items-center">
        <img src={user.pictureUrl} style={{verticalAlign: 'middle', width: 40, height: 40, borderRadius: '50%'}} alt=''></img>
        <div className='text-left ml-3 align-text-top w-25'>
          <h5 className='mb-1 d-flex text-nowrap align-items-center'>
            <span className='mr-2'>{user.name}</span>
            {props.user.role === 'leader' ? <Badge pill variant="primary">隊長</Badge> : null}
            {props.user.role === 'manager' ? <Badge pill variant="success">管理員</Badge> : null}
            {props.user.role === 'member' ? <Badge pill variant="secondary">成員</Badge> : null}
          </h5>
          <small className='text-secondary'>{user.email}</small>
        </div>
      </div>
      {buttons && props.user.role !== 'leader' ? buttons : null}
    </div>
  );
}

export default UserItem;
