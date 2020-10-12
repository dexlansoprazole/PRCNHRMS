import React from 'react';
import PropTypes from 'prop-types';
import {Checkbox, Button, ButtonGroup, Grid, Box} from '@material-ui/core';
import {Autorenew, CloudDoneOutlined, CloudOffOutlined, ThumbUpOutlined, ThumbDownOutlined} from '@material-ui/icons';
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
  const {member, role, date, members, setMembers, prevMembers, setPrevMembers} = props;
  const attendance = member.attendance;
  const isPresent = member.isPresent;
  const selectedDate = moment(date).format('YYYY/MM');
  const [checked, setChecked] = React.useState(isPresent);
  const dispatch = useDispatch();
  const patchMember = async (id, memberData) => dispatch(memberActions.patchMember(id, memberData));

  React.useEffect(() => {
    setChecked(isPresent);
  }, [member, isPresent]);

  return (
    <Checkbox
      checked={checked}
      onClick={() => setChecked(!checked)}
      onChange={(event) => {
        if (role === 'leader' || role === 'manager') {
          setPrevMembers(prevMembers);
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

const BtnUpvote = (props) => {
  const {member, role, date, members, setMembers, prevMembers, setPrevMembers} = props;
  const theme = useTheme();
  const user = useSelector(state => state.user);
  const upvoted = member.upvote_attendance.find(v => v.user_id === user._id && moment(v.date).isSame(date)) != null;
  const downvoted = member.downvote_attendance.find(v => v.user_id === user._id && moment(v.date).isSame(date)) != null;
  const [checked, setChecked] = React.useState(upvoted);
  const dispatch = useDispatch();
  const upvoteMember = async (id, data) => dispatch(memberActions.patch_upvote_attendance(id, data));
  const downvoteMember = async (id, data) => dispatch(memberActions.patch_downvote_attendance(id, data));

  React.useEffect(() => {
    setChecked(upvoted);
  }, [member, upvoted]);

  return (
    <Checkbox
      checked={checked}
      onClick={() => setChecked(!checked)}
      onChange={(event) => {
        if (role === 'leader' || role === 'manager' || role === 'member') {
          setPrevMembers(prevMembers);
          setMembers(
            members.map(m => {
              if (m._id === member._id)
                if (event.target.checked && !upvoted) {
                  m = {...m, upvote_attendance: [...m.upvote_attendance, {user_id: user._id, date: date}]}
                  if (downvoted)
                    m = {...m, downvote_attendance: m.downvote_attendance.filter(v => !(v.user_id === user._id && moment(v.date).isSame(date)))}
                }
                else
                  m = {...m, upvote_attendance: m.upvote_attendance.filter(v => !(v.user_id === user._id && moment(v.date).isSame(date)))}
              return m
            })
          );
          upvoteMember(member._id, {date: date});
          if (event.target.checked && downvoted)
            downvoteMember(member._id, {date: date});
        }
      }}
      style={{padding: 5}}
      size='small'
      icon={<ThumbUpOutlined htmlColor={theme.palette.common.white} />}
      checkedIcon={<ThumbUpOutlined htmlColor={theme.palette.primary.main} />}
    >
    </Checkbox>
  );
}

const BtnDownvote = (props) => {
  const {member, role, date, members, setMembers, prevMembers, setPrevMembers} = props;
  const theme = useTheme();
  const user = useSelector(state => state.user);
  const downvoted = member.downvote_attendance.find(v => v.user_id === user._id && moment(v.date).isSame(date)) != null;
  const upvoted = member.upvote_attendance.find(v => v.user_id === user._id && moment(v.date).isSame(date)) != null;
  const [checked, setChecked] = React.useState(downvoted);
  const dispatch = useDispatch();
  const upvoteMember = async (id, data) => dispatch(memberActions.patch_upvote_attendance(id, data));
  const downvoteMember = async (id, data) => dispatch(memberActions.patch_downvote_attendance(id, data));

  React.useEffect(() => {
    setChecked(downvoted);
  }, [member, downvoted]);

  return (
    <Checkbox
      checked={checked}
      onClick={() => setChecked(!checked)}
      onChange={(event) => {
        if (role === 'leader' || role === 'manager' || role === 'member') {
          setPrevMembers(prevMembers);
          setMembers(
            members.map(m => {
              if (m._id === member._id)
                if (event.target.checked && !downvoted) {
                  m = {...m, downvote_attendance: [...m.downvote_attendance, {user_id: user._id, date: date}]}
                  if (upvoted)
                    m = {...m, upvote_attendance: m.upvote_attendance.filter(u => !(u.user_id === user._id && moment(u.date).isSame(date)))}
                }
                else
                  m = {...m, downvote_attendance: m.downvote_attendance.filter(d => !(d.user_id === user._id && moment(d.date).isSame(date)))}
              return m
            })
          );
          downvoteMember(member._id, {date: date});
          if (event.target.checked && upvoted)
            upvoteMember(member._id, {date: date});
        }
      }}
      style={{padding: 5}}
      size='small'
      icon={<ThumbDownOutlined htmlColor={theme.palette.common.white} />}
      checkedIcon={<ThumbDownOutlined htmlColor={theme.palette.primary.main} />}
    >
    </Checkbox>
  );
}

const AttendanceTable = props => {
  const loading = useSelector(state => props.loadingOn.some(a => state.loading[a]));
  const saving = useSelector(state => state.loading['PATCH_MEMBER'] === true);
  const alert = useSelector(state => state.notification.alert);
  const {height} = useWindowResize();
  const [memberClicked, setMemberClicked] = React.useState({});
  const [openKickMemberDialog, setOpenKickMemberDialog] = React.useState(false);
  const [loadingKickMember, setLoadingKickMember] = React.useState(false);
  const [selectedDate, handleDateChange] = React.useState(new Date());
  const [selectedFilter, setSelectedFilter] = React.useState(0);
  const [showSaveDoneMsg, setShowSaveDoneMsg] = React.useState(false);
  const [showSaveDoneMsgTimer, setShowSaveDoneMsgTimer] = React.useState(null);

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
  const [prevMembers, setPrevMembers] = React.useState(members);
  const data = members.map(m => {
    let member = {
      _id: m._id,
      id: m.id,
      name: m.name,
      attendance: m.attendance.map(a => moment(a).format('YYYY/MM')),
      isPresent: m.attendance.map(a => moment(a).format('YYYY/MM')).some(a => a === moment(selectedDate).format('YYYY/MM')),
      join_date: moment(m.join_date).format('YYYY/MM/DD'),
      upvote_attendance: m.upvote_attendance.filter(u => moment(u.date).isSame(moment(selectedDate).startOf('month'))),
      downvote_attendance: m.downvote_attendance.filter(d => moment(d.date).isSame(moment(selectedDate).startOf('month'))),
    }
    member = {...member, vote: member.upvote_attendance.length - member.downvote_attendance.length};
    if (props.showLeaveDate)
      member = {...member, leave_date: m.leave_date ? moment(m.leave_date).format('YYYY/MM/DD') : null};
    if (props.showKickReason)
      member = {...member, kick_reason: m.kick_reason ? m.kick_reason : null};
    return member;
  }).filter(m => moment(m.join_date).isSameOrBefore(moment(selectedDate).endOf('month').format('YYYY/MM/DD')) && (selectedFilter >= 0 ? selectedFilter ? m.isPresent : !m.isPresent : true));

  React.useEffect(() => {
    if (prevSaving && !saving) {
      setShowSaveDoneMsg(true);
      clearTimeout(showSaveDoneMsgTimer);
      setShowSaveDoneMsgTimer(
        setTimeout(() => {
          setShowSaveDoneMsg(false);
        }, 2000)
      );
    }
  }, [saving]);

  React.useEffect(() => {
    if (alert != null && alert.type === 'error') {
      setMembers(prevMembers);
    }
  }, [alert]);

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
    {title: "評價", field: "vote", width: '1%'},
    {
      title: "出勤", field: "isPresent", width: '1%',
      cellStyle: {
        padding: '0px 0px 0px 16px',
      },
      render: rowData => <AttendanceCheckbox member={rowData} role={props.role} date={selectedDate} members={members} setMembers={setMembers} prevMembers={prevMembers} setPrevMembers={setPrevMembers} />
    },
    {
      width: '1%',
      render: rowData =>
        <Grid container direction='row' spacing={2} wrap='nowrap' alignItems='center' justify='center'>
          <Grid><BtnUpvote member={rowData} role={props.role} date={moment(selectedDate).startOf('month')} members={members} setMembers={setMembers} prevMembers={prevMembers} setPrevMembers={setPrevMembers} /></Grid>
          <Grid><BtnDownvote member={rowData} role={props.role} date={moment(selectedDate).startOf('month')} members={members} setMembers={setMembers} prevMembers={prevMembers} setPrevMembers={setPrevMembers} /></Grid>
        </Grid>
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
                : showSaveDoneMsg ? alert != null && alert.type === 'error' ?
                  <>
                    <Grid item style={{display: 'flex'}}>
                      <CloudOffOutlined htmlColor={tableTheme.palette.error.main} />
                    </Grid>
                    <Grid item style={{display: 'flex'}}>
                      <Box fontSize='1rem' color={tableTheme.palette.error.main}>儲存失敗</Box>
                    </Grid>
                  </>
                  :
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
            props.role === 'leader' || props.role === 'manager' ?
              [{
                icon: () => <UserX />,
                tooltip: '踢除',
                onClick: (event, member) => {
                  setMemberClicked(member);
                  setOpenKickMemberDialog(true);
                }
              }] : []
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

export default React.memo(AttendanceTable, (prevProps, nextProps) => true);