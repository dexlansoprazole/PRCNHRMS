import React from 'react';

const UserItem = (props) => {
  const user = props.user;
  const buttons = props.buttons;
  return (
    <div className="d-flex justify-content-between list-group-item">
      <div className="d-flex text-nowrap align-items-center">
        <img src={user.pictureUrl} style={{verticalAlign: 'middle', width: 40, height: 40, borderRadius: '50%'}} alt=''></img>
        <div className='text-left ml-3 align-text-top w-25'>
          <h5 className='mb-1'>{user.name}</h5>
          <small className='text-secondary'>{user.email}</small>
        </div>
      </div>
      {buttons ? buttons : null}
    </div>
  );
}

export default UserItem;
