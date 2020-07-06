import React from 'react';
import PropTypes from 'prop-types';
import {Checkbox} from '@material-ui/core';
import {createMuiTheme, MuiThemeProvider, useTheme} from '@material-ui/core/styles';
import {useDispatch, useSelector} from 'react-redux';
import {useWindowResize} from './useWindowResize';
import MaterialTable from "material-table";
import tableIcons from './tableIcons';
import {UserX} from 'react-feather';
import deepEqual from 'deep-equal';
import MonthPicker from './MonthPicker';
import KickMemberDialog from './team/KickMemberDialog';
import memberActions from '../actions/member';
import moment from 'moment';

const AttendanceCheckbox = (props) => {
  const {member, role, date} = props;
  const attendance = member.attendance;
  const isPresent = member.isPresent;
  const selectedDate = moment(date).format('YYYY/MM');
  const [checked, setChecked] = React.useState(isPresent);
  const dispatch = useDispatch();
  const patchMember = async (id, memberData) => dispatch(memberActions.patchMember(id, memberData));

  React.useEffect(() => {
    setChecked(isPresent);
  }, [isPresent]);

  return (
    <Checkbox
      checked={checked}
      onChange={(event) => {
        if (role === 'leader' || role === 'manager') {
          if (event.target.checked) {
            if (!isPresent)
              patchMember(member._id, {attendance: [...attendance, selectedDate]});
          }
          else
            patchMember(member._id, {attendance: attendance.filter(d => d !== selectedDate)});
        }
      }}
      size='small'
      style={{pointerEvents: role === 'leader' || role === 'manager' ? 'all' : 'none', padding: 5}}
    />
  );
}

const AttendanceTable = props => {
  const loading = useSelector(state => props.loadingOn.some(a => state.loading[a]));
  const {height} = useWindowResize();
  const [memberClicked, setMemberClicked] = React.useState({});
  const [openKickMemberDialog, setOpenKickMemberDialog] = React.useState(false);
  const [loadingKickMember, setLoadingKickMember] = React.useState(false);
  const [selectedDate, handleDateChange] = React.useState(new Date());
  const globalTheme = useTheme();
  const tableTheme = createMuiTheme(
    {
      ...globalTheme,
      palette: {
        ...globalTheme.palette,
        secondary: globalTheme.palette.primary
      },
      overrides: {
        MuiTableRow: {
          root: {
            transition: 'all 0s !important',
            "&:hover": {
              backgroundColor: globalTheme.palette.action.hover,
            }
          }
        }
      }
    },
  );

  const members = props.members.map((m, i) => {
    let member = {
      _id: m._id,
      id: m.id,
      name: m.name,
      attendance: m.attendance.map(a => moment(a).format('YYYY/MM')),
      isPresent: m.attendance.map(a => moment(a).format('YYYY/MM')).some(a => a === moment(selectedDate).format('YYYY/MM')),
      join_date: moment(m.join_date).format('YYYY/MM/DD')
    }
    if (props.showLeaveDate)
      member = {...member, leave_date: m.leave_date ? moment(m.leave_date).format('YYYY/MM/DD') : null};
    if (props.showKickReason)
      member = {...member, kick_reason: m.kick_reason ? m.kick_reason : null};
    return member;
  });

  const columns = [
    {title: "#", render: rowData => rowData ? rowData.tableData.id + 1 : '', editable: 'never', width: '1%'},
    {title: "ID", field: "id"},
    {title: "暱稱", field: "name"},
    {title: "加入日期", field: "join_date"}
  ]
  if (props.showLeaveDate) columns.push(
    {title: "退出日期", field: "leave_date"}
  );
  if (props.showKickReason) columns.push(
    {title: "踢除原因", field: "kick_reason"}
  );

  columns.push(
    {
      title: "出勤", field: "isPresent", width: '1%',
      cellStyle: {
        padding: '0px 0px 0px 16px',
      },
      render: rowData => <AttendanceCheckbox member={rowData} role={props.role} date={selectedDate} />
    }
  );

  return (
    <MuiThemeProvider theme={tableTheme}>
      <KickMemberDialog member={memberClicked} open={openKickMemberDialog} setOpen={setOpenKickMemberDialog} setLoading={setLoadingKickMember} />
      <MaterialTable
        title={
          <MonthPicker
            value={selectedDate}
            onChange={handleDateChange}
          />
        }
        icons={tableIcons}
        columns={columns}
        data={members}
        isLoading={loading || loadingKickMember}
        actions={props.showLeaveDate || props.showKickReason || !(props.role === 'leader' || props.role === 'manager') ? [] : [
          {
            icon: () => <UserX />,
            tooltip: '踢除',
            onClick: (event, member) => {
              setMemberClicked(member);
              setOpenKickMemberDialog(true);
            }
          }
        ]}
        options={{
          actionsColumnIndex: -1,
          paging: false,
          maxBodyHeight: height - 300,
          headerStyle: {position: 'sticky', top: 0, whiteSpace: 'nowrap'},
          addRowPosition: 'first',
          padding: 'dense',
        }}
        localization={{
          header: {
            actions: ''
          },
          toolbar: {
            searchTooltip: '搜尋',
            searchPlaceholder: '搜尋',
          },
          body: {
            emptyDataSourceMessage: '查無成員',
            addTooltip: '新增成員',
            deleteTooltip: '刪除',
            editTooltip: '編輯',
            editRow: {
              deleteText: '確定要刪除此成員?',
              cancelTooltip: '取消',
              saveTooltip: '完成'
            }
          }
        }}
      />
    </MuiThemeProvider>
  );
}

AttendanceTable.propTypes = {
  members: PropTypes.array.isRequired,
  role: PropTypes.string,
  loadingOn: PropTypes.array,
  showLeaveDate: PropTypes.bool,
  showKickReason: PropTypes.bool,
};

AttendanceTable.defaultProps = {
  showLeaveDate: true,
  showKickReason: true,
  loadingOn: []
}

export default React.memo(AttendanceTable, (prevProps, nextProps) => deepEqual(prevProps, nextProps));