import React from 'react';
import PropTypes from 'prop-types';
import {Chip, Avatar} from '@material-ui/core';
import {useDispatch} from 'react-redux';
import UserTable from '../UserTable';
import teamActions from '../../actions/team';

const JoinedUserTable = (props) => {
  const team = props.team;
  const role = props.role;
  const users = [team.users.leader].concat(team.users.managers, team.users.members);
  const dispatch = useDispatch();
  const deleteMember = async (team_id, user_id) => dispatch(teamActions.deleteMember(team_id, user_id));

  const handleKickUser = oldData =>
    new Promise(async (resolve, reject) => {
      if (oldData.role === 'member')
        await deleteMember(team._id, oldData._id);
      // TODO: delete manager
      resolve();
    })

  const data = users.map(u => ({
    ...u,
    role: team.users.leader._id === u._id ? 'leader' : team.users.managers.find(m => m._id === u._id) ? 'manager' : team.users.members.find(m => m._id === u._id) ? 'member' : null
  }));

  const columns = [
    {
      title: "",
      render: rowData => <Avatar src={rowData.pictureUrl} />,
      cellStyle: {
        padding: '12px'
      },
      width: '1%'
    },
    {title: "名稱", field: "name"},
    {title: "電子信箱", field: "email"},
    {
      title: "職位", field: "role", editable: 'never', width: '1%',
      render: rowData => {
        if (rowData) {
          switch (rowData.role) {
            case 'leader':
              return <Chip label='隊長' size='small' color='secondary' />;
            case 'manager':
              return <Chip label='管理員' size='small' color='secondary' />;
            case 'member':
              return <Chip label='成員' size='small' color='default' />;
            default:
              return null;
          }
        }
        else
          return <Chip label='隊長' size='small' color='secondary' />;
      }
    }
  ]

  return (
    <UserTable
      data={data}
      columns={columns}
      loadingOn={['ADD_TEAM_MEMBER', 'PATCH_USER']}
      editable={{
        isDeleteHidden: rowData => (role !== 'leader' && role !== 'manager') || rowData.role === 'leader' || rowData.role === role,
        onRowDelete: handleKickUser,
      }}
      deleteTooltip='踢除'
      deleteText='確定要踢除此成員?'
    />
  );
}

JoinedUserTable.propTypes = {
  team: PropTypes.object,
  role: PropTypes.string,
  toolbar: PropTypes.bool
};

export default JoinedUserTable;
