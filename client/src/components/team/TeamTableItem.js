import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Redirect } from 'react-router-dom';
import {Edit, Trash2, PlusSquare, XSquare} from 'react-feather';
import {createUseStyles} from 'react-jss';
import teamActions from '../../actions/team'

const TeamTableItem = props => {
  const dispatch = useDispatch();
  const setTeamClicked = props.setTeamClicked;
  const setTeamSelected = (team) => dispatch(teamActions.setTeamSelected(team));
  const addJoinRequest = (id) => dispatch(teamActions.addJoinRequest(id));
  const deleteJoinRequest = (id) => dispatch(teamActions.deleteJoinRequest(id));

  const user = useSelector(state => state.auth.user);
  const members = useSelector(state => state.member.members);

  const isLeader = props.team.leader._id === user._id;
  const isManager = props.team.managers.find(m => m._id === user._id) ? true : false;
  const isRequested = props.team.requests.find(r => r === user._id) ? true : false;
  
  const [isHovered, setIsHovered] = useState(false);
  const [isRedirect, setIsRedirect] = useState(false);

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

  if (isRedirect) {
    return <Redirect to="/member_management" />;
  }

  return (
    <tr style={{cursor: props.showPosition ? 'pointer' : 'normal'}} onMouseOver={() => {setIsHovered(true)}} onMouseLeave={() => {setIsHovered(false)}} onClick={
      props.showPosition ? 
        () => {
          setTeamSelected(props.team);
          setIsRedirect(true);
        }
      : null
    }>
      <td className="fit">{props.index}</td>
      <td>{props.team.name}</td>
      <td>{props.team.leader.name}</td>
      <td>{members.filter(m => m.team === props.team._id && !m.leave_date).length + "/30"}</td>
      {
        props.showPosition ? 
          <td>
            {isLeader ? renderBadge('隊長', 'primary') : null}
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
        {!(isLeader || isManager) ? isRequested ?
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