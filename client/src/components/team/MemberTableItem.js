import React, {useState} from 'react';
import {Edit, UserX, Trash2} from 'react-feather';
import {createUseStyles} from 'react-jss'

var moment = require('moment');

const MemberTableItem = props => {

  const [isHovered, setIsHovered] = useState(false);

  const btnStyles = {
    opacity: isHovered ? 1 : 0
  }

  const classes = createUseStyles({
    btnFunc: {
      transition: "opacity .2s",
      backgroundColor: "transparent",
      border: '1px solid transparent',
      borderRadius: 4,
      padding: "4px",
      margin: "0px 8px 0px 8px",
      '&:focus': {
        outline: 'none',
        boxShadow: 'none'
      },
      '&:hover': {
        border: '1px solid #ccc',
        backgroundColor: '#ddd'
      }
    }
  })();

  return (
    <tr onMouseOver={() => {setIsHovered(true)}} onMouseLeave={() => {setIsHovered(false)}}>
      <td className="fit">{props.index}</td>
      <td className="fit">{props.member.id}</td>
      <td>{props.member.name}</td>
      <td>{moment(props.member.join_date).format('YYYY/MM/DD')}</td>
      <td>{props.member.leave_date ? moment(props.member.leave_date).format('YYYY/MM/DD') : "-"}</td>
      <td>{props.member.kick_reason ? props.member.kick_reason : "-"}</td>
      <td className="fit p-0" style={{verticalAlign: 'middle'}}>
        <button className={classes.btnFunc} data-toggle="modal" data-target="#editMemberModal" style={btnStyles} onClick={() => props.setMemberClicked(props.member)}><Edit></Edit></button>
          {
            !props.member.leave_date ?
            <button className={classes.btnFunc} data-toggle="modal" data-target="#kickMemberModal" style={btnStyles} onClick={() => props.setMemberClicked(props.member)}><UserX></UserX></button> :
              ""
          }
        <button className={classes.btnFunc} data-toggle="modal" data-target="#deleteMemberModal" style={btnStyles} onClick={() => props.setMemberClicked(props.member)}><Trash2></Trash2></button>
      </td>
    </tr>
  );
};

export default MemberTableItem;