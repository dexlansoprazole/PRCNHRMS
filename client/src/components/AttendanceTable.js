import React from 'react';
import PropTypes from 'prop-types';
import {Checkbox, Button, ButtonGroup, Grid, Box} from '@material-ui/core';
import {Autorenew, CloudDoneOutlined} from '@material-ui/icons';
import {createMuiTheme, MuiThemeProvider, useTheme} from '@material-ui/core/styles';
import {useDispatch, useSelector} from 'react-redux';
import {useWindowResize} from './useWindowResize';
import MaterialTable, {MTableAction} from "material-table";
import tableIcons from './tableIcons';
import {UserX} from 'react-feather';
import deepEqual from 'deep-equal';
import MonthPicker from './MonthPicker';
import KickMemberDialog from './team/KickMemberDialog';
import memberActions from '../actions/member';
import moment from 'moment';
import "moment/locale/zh-tw";
moment.locale("zh-tw");

const AttendanceCheckbox = (props) => {
  const {member, role, date, members, setMembers} = props;
  const attendance = member.attendance;
  const isPresent = member.isPresent;
  const selectedDate = moment(date).format('YYYY/MM');
  const [checked, setChecked] = React.useState(isPresent);

  React.useEffect(() => {
    setChecked(isPresent);
  }, [member]);

  return (
    <Checkbox
      checked={checked}
      onClick={() => setChecked(!checked)}
      onChange={(event) => {
        if (role === 'leader' || role === 'manager') {
          setMembers(
            members.map(m => {
              if (m._id === member._id)
                if (event.target.checked)
                  m = {...m, attendance: [...attendance, selectedDate]}
                else
                  m = {...m, attendance: attendance.filter(d => d !== selectedDate)}
              return m
            })
          );
        }
      }}
      size='small'
      style={{pointerEvents: role === 'leader' || role === 'manager' ? 'all' : 'none', padding: 5}}
    />
  );
}

const AttendanceTable = props => {
  const loading = useSelector(state => props.loadingOn.some(a => state.loading[a]));
  const saving = useSelector(state => state.loading['PATCH_MEMBERS'] == true);
  const {height} = useWindowResize();
  const [memberClicked, setMemberClicked] = React.useState({});
  const [openKickMemberDialog, setOpenKickMemberDialog] = React.useState(false);
  const [loadingKickMember, setLoadingKickMember] = React.useState(false);
  const [selectedDate, handleDateChange] = React.useState(new Date());
  const [selectedFilter, setSelectedFilter] = React.useState(0);
  const [saveTimer, setSaveTimer] = React.useState(null);
  const [showSaveDoneMsg, setShowSaveDoneMsg] = React.useState(false);
  const dispatch = useDispatch();
  const patchMembers = async (members) => dispatch(memberActions.patchMembers(members));

  const usePrevious = (value) => {
    const ref = React.useRef();
    React.useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  const prevSaving = usePrevious(saving);

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

  const [members, setMembers] = React.useState(props.members);
  const data = members.map(m => {
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
  }).filter(m => moment(m.join_date).isSameOrBefore(moment(selectedDate).endOf('month').format('YYYY/MM/DD')) && (selectedFilter >= 0 ? selectedFilter ? m.isPresent : !m.isPresent : true));

  React.useEffect(() => {
    clearTimeout(saveTimer);
    setSaveTimer(
      setTimeout(() => {
        if (saveTimer != null)
          patchMembers(members.map(m => Object.filter(m, ['_id', 'attendance'])));
      }, 500)
    )
  }, [members]);

  React.useEffect(() => {
    if (prevSaving && !saving) {
      setShowSaveDoneMsg(true);
      setTimeout(() => {
        setShowSaveDoneMsg(false);
      }, 2000);
    }
  }, [saving]);

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
      render: rowData => <AttendanceCheckbox member={rowData} role={props.role} date={selectedDate} members={members} setMembers={setMembers} />
    }
  );

  const handleFilterClick = (index) => {
    setSelectedFilter(index);
  }

  return (
    <MuiThemeProvider theme={tableTheme}>
      <KickMemberDialog
        member={memberClicked}
        open={openKickMemberDialog}
        setOpen={setOpenKickMemberDialog}
        setLoading={setLoadingKickMember}
        defaultKickReason={!memberClicked.isPresent ? moment(selectedDate).format('YYYY年M月份戰隊競賽缺勤') : ''}
      />
      <MaterialTable
        title={
          <Grid container direction='row' spacing={1} wrap='nowrap' alignItems='center'>
            <Grid item>
              <MonthPicker
                value={selectedDate}
                onChange={handleDateChange}
              />
            </Grid>

            {
              saving ?
                <>
                  <Grid item style={{display: 'flex'}}>
                    <Autorenew htmlColor={tableTheme.palette.grey[500]} />
                  </Grid>
                  <Grid item style={{display: 'flex'}}>
                    <Box fontSize='1rem' color={tableTheme.palette.grey[500]}>儲存中...</Box>
                  </Grid>
                </>
                : showSaveDoneMsg ?
                  <>
                    <Grid item style={{display: 'flex'}}>
                      <CloudDoneOutlined htmlColor={tableTheme.palette.grey[500]} />
                    </Grid>
                    <Grid item style={{display: 'flex'}}>
                      <Box fontSize='1rem' color={tableTheme.palette.grey[500]}>已儲存</Box>
                    </Grid>
                  </>
                  : null
            }
          </Grid>
        }
        icons={tableIcons}
        columns={columns}
        data={data}
        isLoading={loading || loadingKickMember}
        actions={
          [{
            icon: () => null,
            onClick: () => {},
            isFreeAction: true
          }].concat(
            !(props.role === 'leader' || props.role === 'manager') ? [] :
              [{
                icon: () => <UserX />,
                tooltip: '踢除',
                onClick: (event, member) => {
                  setMemberClicked(member);
                  setOpenKickMemberDialog(true);
                }
              }]
          )
        }
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
        components={{
          Action: props => {
            if (props.action.isFreeAction) {
              const getStyle = (targetFilter) => {
                const backgroundColor = selectedFilter === targetFilter ? globalTheme.palette.primary.main : globalTheme.palette.type === 'dark' ? globalTheme.palette.grey[700] : globalTheme.palette.background.default;
                const borderColor = globalTheme.palette.type === 'dark' ? globalTheme.palette.grey[600] : globalTheme.palette.grey[300];
                return {
                  backgroundColor: backgroundColor,
                  color: globalTheme.palette.getContrastText(backgroundColor),
                  borderColor: borderColor,
                  whiteSpace: 'nowrap'
                }
              }

              return (
                <ButtonGroup disableElevation variant='contained' style={{padding: '12px'}}>
                  <Button onClick={() => handleFilterClick(0)} style={getStyle(0)}>未出勤</Button>
                  <Button onClick={() => handleFilterClick(1)} style={getStyle(1)}>已出勤</Button>
                  <Button onClick={() => handleFilterClick(-1)} style={getStyle(-1)}>全部</Button>
                </ButtonGroup>
              )
            }
            else {
              return (
                <MTableAction {...props} />
              )
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