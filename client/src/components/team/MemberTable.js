import React from 'react';
import PropTypes from 'prop-types';
import {TextField} from '@material-ui/core';
import {useDispatch} from 'react-redux';
import {useWindowResize} from '../useWindowResize';
import MaterialTable from "material-table";
import tableIcons from '../tableIcons';
import {Edit, UserX, Trash2} from 'react-feather';
import moment from 'moment';
import EditMemberDialog from './EditMemberDialog';
import memberActions from '../../actions/member';

import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

const MemberTable = props => {
  const dispatch = useDispatch();
  const patchMember = (id, memberData) => dispatch(memberActions.patchMember(id, memberData));
  const {height} = useWindowResize();
  const [memberClicked, setMemberClicked] = React.useState({});
  const [idError, setIdError] = React.useState({
    error: false,
    label: "",
    helperText: "",
    validateInput: false,
  });
  const [openEditMemberDialog, setOpenEditMemberDialog] = React.useState(false);
  const [openKickMemberDialog, setOpenKickEditMemberDialog] = React.useState(false);
  const [openDeleteMemberDialog, setOpenDeleteMemberDialog] = React.useState(false);
  const members = props.members.map((m, i) => (
    {
      ...m,
      index: i + 1,
      join_date: m.join_date ? moment(m.join_date).format('YYYY/MM/DD') : null,
      leave_date: m.leave_date ? moment(m.leave_date).format('YYYY/MM/DD') : null,
    }
  ));
  const columns = [
    {title: "#", field: "index", editable: 'never'},
    {
      title: "ID", field: "id", editComponent: props => {
        console.log(props);
        
        return (
          <TextField
            type="text"
            error={
              idError.error
            }
            helperText={
              idError.helperText
            }
            value={props.value}
            onChange={(e) => {
              if (idError.validateInput) {
                setIdError({
                  ...idError,
                  validateInput: false,
                });
              }

              props.onChange(e.target.value);
            }}
          />
        )
      }
    },
    {title: "暱稱", field: "name"},
    {title: "加入日期", field: "join_date"}
  ]
  if (props.showLeaveDate) columns.push({title: "退出日期", field: "leave_date"});
  if (props.showKickReason) columns.push({title: "踢除原因", field: "kick_reason"});

  return (
    <>
      <EditMemberDialog member={memberClicked} open={openEditMemberDialog} setOpen={setOpenEditMemberDialog} />
      <MaterialTable
        title="戰隊成員"
        icons={tableIcons}
        columns={columns}
        data={members}
        actions={[
          {
            icon: () => <Edit />,
            tooltip: '編輯',
            onClick: (event, member) => {
              setMemberClicked(member);
              setOpenEditMemberDialog(true);
            }
          },
          {
            icon: () => <UserX />,
            tooltip: '踢除',
            onClick: (event, member) => {
              setMemberClicked(member);
              setOpenKickEditMemberDialog(true);
            }
          },
          {
            icon: () => <Trash2 />,
            tooltip: '刪除',
            onClick: (event, member) => {
              setMemberClicked(member);
              setOpenDeleteMemberDialog(true);
            }
          }
        ]}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                newData.submitted = true;
                let re = /^\d{9}$/g;
                if (!re.exec(newData.id)) {
                  // setIdError({
                  //   error: true,
                  //   helperText: "必須為9位數字",
                  //   validateInput: true,
                  // });
                  reject();
                  return;
                }
                resolve();
              }, 600);
              // patchMember(newMember._id, newMember);
            }),
        }}
        options={{
          actionsColumnIndex: -1,
          paging: false,
          maxBodyHeight: height - 300,
          headerStyle: {position: 'sticky', top: 0},
        }}
        localization={{
          header: {
            actions: ''
          },
          toolbar: {
            searchTooltip: '搜尋',
            searchPlaceholder: '搜尋'
          }
        }}
      />
    </>
  );
}

MemberTable.propTypes = {
  members: PropTypes.array.isRequired,
  role: PropTypes.string,
  showLeaveDate: PropTypes.bool,
  showKickReason: PropTypes.bool
};

MemberTable.defaultProps = {
  showLeaveDate: true,
  showKickReason: true
}

export default MemberTable;