import React from 'react';
import PropTypes from 'prop-types';
import {Chip, Link} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import {useTheme, makeStyles} from '@material-ui/core/styles';
import TeamTable from './TeamTable';
import TableEditField from '../TableEditField';
import teamActions from '../../actions/team';
import deepEqual from 'deep-equal';

const MyTeamTable = props => {
  const theme = useTheme();
  const user = useSelector(state => state.user);
  const teams = useSelector(state => state.teams);
  const dispatch = useDispatch();
  const addTeam = (newTeam) => dispatch(teamActions.addTeam(newTeam));
  const patchTeam = (id, teamData) => dispatch(teamActions.patchTeam(id, teamData));
  const deleteTeam = id => dispatch(teamActions.deleteTeam(id));
  const validRef = React.useRef({});

  const classes = makeStyles((theme) => ({
    listName: {
      color: theme.palette.common.black,
      '&:hover': {
        color: theme.palette.info.dark
      }
    }
  }))(theme);

  const handleTeamAdd = newData =>
    new Promise((resolve, reject) => {
      if (!Object.values(validRef.current).every((v) => v === true)) {
        reject();
        return;
      }
      let newTeam = Object.filter(newData, ['name']);
      newTeam = {...newTeam, leader: user._id}
      addTeam(newTeam);
      validRef.current = {};
      resolve();
    })

  const handleTeamUpdate = (newData, oldData) =>
    new Promise((resolve, reject) => {
      if (!Object.values(validRef.current).every((v) => v === true)) {
        reject();
        return;
      }
      let oldTeam = Object.filter(oldData, ['name']);
      let newTeam = Object.filter(newData, ['name']);
      if (deepEqual(oldTeam, newTeam)) {
        resolve();
        return;
      }
      patchTeam(oldData.teamData._id, newTeam);
      validRef.current = {};
      reject();
    })

  const handleTeamDelete = oldData =>
    new Promise((resolve, reject) => {
      deleteTeam(oldData.teamData._id);
      reject();
    })

  const data = teams.map((t, i) => {
    let team = {
      name: t.name,
      leader: t.users.leader.name,
      member_count: t.members.filter(m => m.leave_date == null).length + "/30",
      isLeader: t.users.leader._id === user._id,
      isManager: t.users.managers.find(m => m._id === user._id) ? true : false,
      isMember: t.users.members.find(m => m._id === user._id) ? true : false,
      isRequested: t.users.requests.find(r => r === user._id) ? true : false,
      teamData: t
    }
    return team;
  });

  const columns = [
    {title: "#", render: rowData => rowData ? rowData.tableData.id + 1 : '', editable: 'never', width: '1%'},
    {
      title: "名稱", field: "name",
      render: rowData =>
        <Link
          style={{
            ...(rowData.teamData._id === props.teamSelected._id && {
              textDecoration: 'underline',
              color: theme.palette.info.dark,
            })
          }}
          className={classes.listName}
          onClick={() => props.onLinkClick(rowData.teamData)}
        >
          {rowData.name}
        </Link>,
      editComponent: props =>
        <TableEditField
          {...props}
          type='text'
          autoFocus
          required
          reValidators={[(/^.{2,10}$/)]}
          helperTexts={['長度必須在2到10之間']}
          validRef={validRef}
        />
    },
    {title: "隊長", field: "leader", editable: 'never', initialEditValue: user.name},
    {title: "成員數", field: "member_count", editable: 'never', initialEditValue: '0/30'},
    {
      title: "職位", field: "role", editable: 'never',
      render: rowData => {
        return rowData ? (
          <>
            {rowData.isLeader ? <Chip label='隊長' size='small' color='secondary' /> : null}
            {rowData.isManager ? <Chip label='管理員' size='small' color='secondary' /> : null}
            {rowData.isMember ? <Chip label='成員' size='small' color='default' /> : null}
          </>
        ) : <Chip label='隊長' size='small' color='secondary' />
      }
    }
  ]

  return (
    <TeamTable
      data={data}
      columns={columns}
      editable={{
        isEditHidden: rowData => !rowData.isLeader,
        isDeleteHidden: rowData => !rowData.isLeader,
        onRowAdd: handleTeamAdd,
        onRowUpdate: handleTeamUpdate,
        onRowDelete: handleTeamDelete,
      }}
      teamSelected={props.teamSelected}
      setTeamSelected={props.setTeamSelected}
      toolbar={props.toolbar}
    />
  );
}

MyTeamTable.propTypes = {
  teamSelected: PropTypes.object,
  setTeamSelected: PropTypes.func,
  onLinkClick: PropTypes.func,
  toolbar: PropTypes.bool
};

export default React.memo(MyTeamTable, (prevProps, nextProps) => deepEqual(prevProps, nextProps));