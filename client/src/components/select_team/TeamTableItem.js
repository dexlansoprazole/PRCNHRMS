import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useSelector, useDispatch} from 'react-redux';
import {IconButton, TableCell, TableRow, Link, Chip, Grid} from '@material-ui/core';
import {Edit, Trash2, PlusSquare, XSquare} from 'react-feather';
import AlertDialog from '../AlertDialog';
import EditTeamDialog from './EditTeamDialog';
import useStyles from '../../styles';
import teamActions from '../../actions/team';
import userActions from '../../actions/user';

const TeamTableItem = props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const deleteTeam = id => dispatch(teamActions.deleteTeam(id));
  const addJoinRequest = (id) => dispatch(teamActions.addJoinRequest(id));
  const deleteJoinRequest = (id) => dispatch(teamActions.deleteJoinRequest(id));
  const patchUser = (data) => dispatch(userActions.patchUser(data));
  const [openDeleteTeamDialog, setOpenDeleteTeamDialog] = React.useState(false);
  const [openEditTeamDialog, setOpenEditTeamDialog] = React.useState(false);

  const user = useSelector(state => state.user);

  const isLeader = props.team.users.leader._id === user._id;
  const isManager = props.team.users.managers.find(m => m._id === user._id) ? true : false;
  const isMember = props.team.users.members.find(m => m._id === user._id) ? true : false;
  const isRequested = props.team.users.requests.find(r => r === user._id) ? true : false;

  const [isHovered, setIsHovered] = useState(false);

  const btnFuncStyles = {
    opacity: isHovered ? 1 : 0
  }

  const renderBadge = (text, color, outline) => {
    return (
      <Chip
        size="small"
        label={text}
        color={color}
      />
    )
  }

  const handleClick = (e) => {
    if (props.setTeamSelected)
      props.setTeamSelected(props.team)
  }

  const handleFuncClick = (e) => {
    e.stopPropagation();
    switch (e.target.name) {
      case 'edit':
        setOpenEditTeamDialog(true);
        break;
      case 'delete':
        setOpenDeleteTeamDialog(true);
        break;
      default:
        break;
    }
  }

  const handleLinkClick = (e) => {
    e.preventDefault();
    patchUser({teamSelected: props.team._id});
  }

  return (
    <TableRow
      hover
      style={{cursor: props.showPosition ? 'pointer' : 'normal', height: '48px'}}
      onMouseOver={() => {setIsHovered(true)}}
      onMouseLeave={() => {setIsHovered(false)}}
      onClick={handleClick}
      selected={props.selected}
    >
      <TableCell>{props.index}</TableCell>
      <TableCell>
        {props.link ? <Link onClick={handleLinkClick} style={{textDecoration: (props.selected || isHovered) ? 'underline' : 'none'}}>{props.team.name}</Link> : props.team.name}
      </TableCell>
      <TableCell>{props.team.users.leader.name}</TableCell>
      <TableCell>{props.team.members.filter(m => m.leave_date == null).length + "/30"}</TableCell>
      {
        props.showPosition ?
          <TableCell>
            {isLeader ? <Chip label='隊長' size='small' color='secondary' /> : null}
            {isManager ? <Chip label='管理員' size='small' color='secondary' /> : null}
            {isMember ? <Chip label='成員' size='small' color='default' /> : null}
          </TableCell>
          : null
      }
      <TableCell style={{verticalAlign: 'middle'}} padding='none'>
        <Grid container>
          {isLeader ?
            <Grid item>
              <IconButton
                className={classes.btnTableItemFunc}
                style={btnFuncStyles}
                name='edit'
                onClick={handleFuncClick}
              >
                <Edit></Edit>
              </IconButton>
            </Grid> :
            null
          }
          {isLeader ?
            <Grid item>
              <IconButton
                className={classes.btnTableItemFunc}
                style={btnFuncStyles}
                name='delete'
                onClick={handleFuncClick}
              >
                <Trash2></Trash2>
              </IconButton>
            </Grid> :
            null
          }
          {!(isLeader || isManager || isMember) ? isRequested ?
            <Grid item>
              <IconButton
                className={classes.btnTableItemFunc}
                style={btnFuncStyles}
                onClick={() => deleteJoinRequest(props.team._id)}
              >
                <XSquare></XSquare>
              </IconButton>
            </Grid> :
            <Grid item>
              <IconButton
                className={classes.btnTableItemFunc}
                style={btnFuncStyles}
                onClick={() => addJoinRequest(props.team._id)}
              >
                <PlusSquare></PlusSquare>
              </IconButton>
            </Grid> :
            null
          }
        </Grid>
      </TableCell>

      <AlertDialog
        title={'刪除戰隊'}
        content={'是否要刪除 ' + props.team.name + ' ?'}
        action={() => deleteTeam(props.team._id)}
        open={openDeleteTeamDialog}
        setOpen={setOpenDeleteTeamDialog}
      />

      <EditTeamDialog
        team={props.team}
        open={openEditTeamDialog}
        setOpen={setOpenEditTeamDialog}
      />
    </TableRow>
  );
};

TeamTableItem.propTypes = {
  team: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  link: PropTypes.bool,
  showPosition: PropTypes.bool,
  showFuncs: PropTypes.bool,
  setTeamSelected: PropTypes.func,
  selected: PropTypes.bool
};

export default TeamTableItem;