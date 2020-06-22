import React, {useState} from 'react';
import {IconButton, TableCell, TableRow, Link} from '@material-ui/core';
import {Edit, UserX, Trash2} from 'react-feather';
import useStyles from '../../styles';

var moment = require('moment');

const MemberTableItem = props => {
  const classes = useStyles();
  const [isHovered, setIsHovered] = useState(false);
  const [openEditMemberDialog, setOpenEditMemberDialog] = React.useState(false);
  const [openDeleteMemberDialog, setOpenDeleteMemberDialog] = React.useState(false);
  const [openKickMemberDialog, setOpenKickMemberDialog] = React.useState(false);

  const btnStyles = {
    opacity: isHovered ? 1 : 0
  }

  const handleFuncClick = (e) => {
    e.stopPropagation();
    switch (e.target.name) {
      case 'edit':
        setOpenEditMemberDialog(true);
        break;
      case 'kick':
        setOpenKickMemberDialog(true);
        break;
      case 'delete':
        setOpenDeleteMemberDialog(true);
        break;
      default:
        break;
    }
  }

  return (
    <TableRow
      hover
      onMouseOver={() => {setIsHovered(true)}}
      onMouseLeave={() => {setIsHovered(false)}}
    >
      <TableCell>{props.index}</TableCell>
      <TableCell>{props.member.id}</TableCell>
      <TableCell>{props.member.name}</TableCell>
      <TableCell>{moment(props.member.join_date).format('YYYY/MM/DD')}</TableCell>
      <TableCell>{props.member.leave_date ? moment(props.member.leave_date).format('YYYY/MM/DD') : "-"}</TableCell>
      <TableCell>{props.member.kick_reason ? props.member.kick_reason : "-"}</TableCell>
      {
        props.role === "leader" || props.role === 'manager' ?
          <TableCell style={{verticalAlign: 'middle'}}>
            <IconButton
              className={classes.btnFunc}
              name='edit'
              style={btnStyles}
              onClick={handleFuncClick}
              disableRipple
            >
              <Edit />
            </IconButton>
            {
              !props.member.leave_date ?
                <IconButton
                  className={classes.btnFunc}
                  name='kick'
                  style={btnStyles}
                  onClick={handleFuncClick}
                  disableRipple
                >
                  <UserX />
                </IconButton>
                : null
            }
            <IconButton
              className={classes.btnFunc}
              name='delete'
              style={btnStyles}
              onClick={handleFuncClick}
              disableRipple
            >
              <Trash2 />
            </IconButton>
          </TableCell>
          : null
      }
    </TableRow>
  );
};

export default MemberTableItem;