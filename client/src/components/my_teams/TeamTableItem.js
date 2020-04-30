import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import {Edit, Trash2, PlusSquare, XSquare} from 'react-feather';
import {createUseStyles} from 'react-jss';
import teamActions from '../../actions/team'

const TeamTableItem = props => {
  const history = useHistory();
  const dispatch = useDispatch();
  const setTeamClicked = props.setTeamClicked;
  const addJoinRequest = (id) => dispatch(teamActions.addJoinRequest(id));
  const deleteJoinRequest = (id) => dispatch(teamActions.deleteJoinRequest(id));

  const user = useSelector(state => state.user);

  const isLeader = props.team.users.leader._id === user._id;
  const isManager = props.team.users.managers.find(m => m._id === user._id) ? true : false;
  const isMember = props.team.users.members.find(m => m._id === user._id) ? true : false;
  const isRequested = props.team.users.requests.find(r => r === user._id) ? true : false;
  
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

  const renderBadge = (text, color) => {
    return (
      <span className={"badge badge-pill badge-" + color}>{text}</span>
    )
  }
  
  const handleOnClick = (e) => {
    e.stopPropagation();
    if (setTeamClicked)
      setTeamClicked(props.team);
  }

  return (
    <tr style={{cursor: props.showPosition ? 'pointer' : 'normal'}} onMouseOver={() => {setIsHovered(true)}} onMouseLeave={() => {setIsHovered(false)}} onClick={
      props.showPosition ? () => history.push('/team/' + props.team._id) : null
    }>
      <td className="fit">{props.index}</td>
      <td>{props.team.name}</td>
      <td>{props.team.users.leader.name}</td>
      <td>{props.team.members.filter(m => m.leave_date == null).length + "/30"}</td>
      {
        props.showPosition ? 
          <td>
            {isLeader ? renderBadge('隊長', 'primary') : null}
            {isManager ? renderBadge('管理員', 'success') : null}
            {isMember ? renderBadge('成員', 'secondary') : null}
          </td>
        : null
      }
      <td className="fit p-0" style={{verticalAlign: 'middle'}}>
        {isLeader ?
          <button className={classes.btnFunc} data-toggle="modal" data-target="#editTeamModal" style={btnStyles} onClick={handleOnClick}>
            <Edit></Edit>
          </button> :
          null
        }
        {isLeader ?
        <button className={classes.btnFunc} data-toggle="modal" data-target="#deleteTeamModal" style={btnStyles} onClick={handleOnClick}>
          <Trash2></Trash2>
        </button> :
        null
        }
        {!(isLeader || isManager || isMember) ? isRequested ?
          <button className={classes.btnFunc} data-toggle="modal" style={btnStyles} onClick={() => deleteJoinRequest(props.team._id)}>
            <XSquare></XSquare>
          </button> :
          <button className={classes.btnFunc} data-toggle="modal" style={btnStyles} onClick={() => addJoinRequest(props.team._id)}>
            <PlusSquare></PlusSquare>
          </button> :
          null
        }
      </td>
    </tr>
  );
};

export default TeamTableItem;