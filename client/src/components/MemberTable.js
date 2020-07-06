import React from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup } from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider, useTheme } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useWindowResize } from './useWindowResize';
import MaterialTable, { MTableAction } from "material-table";
import tableIcons from './tableIcons';
import { UserX } from 'react-feather';
import deepEqual from 'deep-equal';
import TableEditField from './TableEditField';
import KickMemberDialog from './team/KickMemberDialog';
import memberActions from '../actions/member';
import moment from 'moment';

const memberFilters = {
  ALL: 'ALL',
  ACTIVE: 'ACTIVE',
  LEFT: 'LEFT'
}

const FilterButtonGroup = props => {
  const {filter, setFilter} = props;
  const globalTheme = useTheme();

  const handleFilterClick = (filter) => {
    setFilter(filter);
  }

  const getStyle = (targetFilter) => {
    const backgroundColor = filter === targetFilter ? globalTheme.palette.primary.main : globalTheme.palette.type === 'dark' ? globalTheme.palette.grey[700] : globalTheme.palette.background.default;
    const borderColor = globalTheme.palette.type === 'dark' ? globalTheme.palette.grey[600] : globalTheme.palette.grey[300];
    return {
      backgroundColor: backgroundColor,
      color: globalTheme.palette.getContrastText(backgroundColor),
      borderColor: borderColor
    }
  }

  return (
    <ButtonGroup disableElevation variant='contained' style={{ padding: '12px' }}>
      <Button onClick={() => handleFilterClick(memberFilters.ACTIVE)} style={getStyle(memberFilters.ACTIVE)}>現役成員</Button>
      <Button onClick={() => handleFilterClick(memberFilters.LEFT)} style={getStyle(memberFilters.LEFT)}>已退出</Button>
      <Button onClick={() => handleFilterClick(memberFilters.ALL)} style={getStyle(memberFilters.ALL)}>全部成員</Button>
    </ButtonGroup>
  );
}

const MemberTable = props => {
  const loading = useSelector(state => props.loadingOn.some(a => state.loading[a]));
  const dispatch = useDispatch();
  const addMember = async newMember => dispatch(memberActions.addMember(newMember));
  const patchMember = async (id, memberData) => dispatch(memberActions.patchMember(id, memberData));
  const deleteMember = async id => dispatch(memberActions.deleteMember(id));
  const { height } = useWindowResize();
  const [memberClicked, setMemberClicked] = React.useState({});
  const [openKickMemberDialog, setOpenKickMemberDialog] = React.useState(false);
  const [loadingKickMember, setLoadingKickMember] = React.useState(false);
  const [memberFilter, setMemberFilter] = React.useState(memberFilters.ACTIVE);
  const validRef = React.useRef({});
  const globalTheme = useTheme();
  const tableTheme = createMuiTheme(
    {
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
    globalTheme
  );

  const members = props.members.filter(m => {
    switch (memberFilter) {
      case memberFilters.ALL:
        return true;
      case memberFilters.ACTIVE:
        return !m.leave_date && !m.kick_reason;
      case memberFilters.LEFT:
        return m.leave_date ? true : false || m.kick_reason ? true : false;
      default:
        return true;
    }
  }).map(m => {
    let member = {
      _id: m._id,
      id: m.id,
      name: m.name,
      join_date: moment(m.join_date).format('YYYY/MM/DD')
    }
    if (memberFilter !== memberFilters.ACTIVE)
      member = { ...member, leave_date: m.leave_date ? moment(m.leave_date).format('YYYY/MM/DD') : null };
    if (memberFilter !== memberFilters.ACTIVE)
      member = { ...member, kick_reason: m.kick_reason ? m.kick_reason : null };
    return member;
  });

  const columns = [
    {
      title: "#", render: rowData => rowData ? rowData.tableData.id + 1 : '', editable: 'never', width: '1%'
    },
    {
      title: "ID", field: "id", editComponent: props =>
        <TableEditField
          {...props}
          type='text'
          required
          reValidators={[(/^\d{9}$/)]}
          helperTexts={['必須為9位數字']}
          validRef={validRef}
        />
    },
    {
      title: "暱稱", field: "name", editComponent: props =>
        <TableEditField
          {...props}
          type='text'
          required
          reValidators={[(/^.{1,10}$/)]}
          helperTexts={['長度必須在1到10之間']}
          validRef={validRef}
        />
    },
    {
      title: "加入日期", field: "join_date", editComponent: props =>
        <TableEditField
          {...props}
          required
          type='date'
          validRef={validRef}
        />
    }
  ]
  if (memberFilter !== memberFilters.ACTIVE) columns.push(
    {
      title: "退出日期", field: "leave_date", editComponent: props =>
        <TableEditField
          {...props}
          requiredDependentOn='kick_reason'
          type='date'
          validRef={validRef}
        />
    }
  );
  if (memberFilter !== memberFilters.ACTIVE) columns.push(
    {
      title: "踢除原因", field: "kick_reason", editComponent: props =>
        <TableEditField
          {...props}
          type='text'
          multiline
          reValidators={[(/^.{0,50}$/)]}
          helperTexts={['長度必須在50以內']}
          validRef={validRef}
        />
    }
  );

  return (
    <MuiThemeProvider theme={tableTheme}>
      <KickMemberDialog member={memberClicked} open={openKickMemberDialog} setOpen={setOpenKickMemberDialog} setLoading={setLoadingKickMember} />
      <MaterialTable
        title="成員管理"
        icons={tableIcons}
        columns={columns}
        data={members}
        isLoading={loading || loadingKickMember}
        actions={
          [{
            icon: () => null,
            onClick: () => { },
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
          )}
        editable={{
          isEditHidden: rowData => props.role !== 'leader' && props.role !== 'manager',
          isDeleteHidden: rowData => props.role !== 'leader' && props.role !== 'manager',
          onRowAdd: props.role === 'leader' || props.role === 'manager' ? newData =>
            new Promise(async (resolve, reject) => {
              if (!Object.values(validRef.current).every((v) => v === true)) {
                reject();
                return;
              }
              let newMember = { ...newData, team: props.team._id }
              await addMember(newMember);
              validRef.current = {};
              resolve();
            }) : null,
          onRowUpdate: (newData, oldData) =>
            new Promise(async (resolve, reject) => {
              if (!Object.values(validRef.current).every((v) => v === true)) {
                reject();
                return;
              }
              let oldMember = Object.filter(oldData, ['id', 'name', 'join_date', 'leave_date', 'kick_reason']);
              let newMember = Object.filter(newData, ['id', 'name', 'join_date', 'leave_date', 'kick_reason']);
              if (deepEqual(oldMember, newMember)) {
                resolve();
                return;
              }
              await patchMember(oldData._id, newMember);
              validRef.current = {};
              resolve();
            }),
          onRowDelete: oldData =>
            new Promise(async (resolve, reject) => {
              await deleteMember(oldData._id);
              resolve();
            }),
        }}
        options={{
          actionsColumnIndex: -1,
          paging: false,
          maxBodyHeight: height - 300,
          headerStyle: { position: 'sticky', top: 0, whiteSpace: 'nowrap' },
          addRowPosition: 'first',
          padding: 'dense'
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
              return <FilterButtonGroup filter={memberFilter} setFilter={setMemberFilter} />
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

MemberTable.propTypes = {
  members: PropTypes.array.isRequired,
  role: PropTypes.string,
  loadingOn: PropTypes.array,
};

MemberTable.defaultProps = {
  loadingOn: []
}

export default React.memo(MemberTable, (prevProps, nextProps) => deepEqual(prevProps, nextProps));