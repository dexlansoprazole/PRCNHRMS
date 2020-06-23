import React from 'react';
import PropTypes from 'prop-types';
import {TextField} from '@material-ui/core';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import {useDispatch} from 'react-redux';
import {useWindowResize} from '../useWindowResize';
import MaterialTable from "material-table";
import tableIcons from '../tableIcons';
import {UserX} from 'react-feather';
import moment from 'moment';
import deepEqual from 'deep-equal';
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import "moment/locale/zh-tw";
import KickMemberDialog from './KickMemberDialog';
import memberActions from '../../actions/member';
moment.locale("zh-tw")

const tableTheme = createMuiTheme({
  overrides: {
    MuiTableRow: {
      root: {
        transition: 'all 0s !important',
        "&:hover": {
          backgroundColor: "#f8f8f8",
        }
      }
    }
  }
});

const MemberTableEditField = props => {
  let isValid = null;
  let helperText = '';
  // TODO: Fix default error message
  switch (props.type) {
    case 'text':
      let isValids = props.reValidators.map(r => r.exec(props.value) ? true : false);
      isValid = !(props.required && !props.value) && Object.values(isValids).every((v) => v === true);
      props.validRef.current = {...props.validRef.current, [props.columnDef.field]: isValid}
      helperText = !isValid ? props.helperTexts[isValids.findIndex(v => v === false)] : '';
      if (props.required && !props.value) helperText = '必填';
      return (
        <TextField
          multiline={props.multiline}
          value={props.value ? props.value : ''}
          onChange={(e) => props.onChange(e.target.value)}
          error={!isValid}
          helperText={helperText}
        />
      )
    case 'date':
      let required = props.required;
      if (props.requiredDependentOn)
        required = props.required || props.rowData[props.requiredDependentOn] ? true : false;
      isValid = (value) => !(required && !value) && (moment(value, "YYYY/MM/DD", true).isValid() || !value);
      let value = props.value ? props.value : required && props.value === undefined ? props.onChange(moment().format("YYYY/MM/DD")) : null;
      props.validRef.current = {...props.validRef.current, [props.columnDef.field]: isValid(value)}
      helperText = !isValid(value) ? '錯誤的日期格式' : '';
      if (required && !value) helperText = '必填';
      return (
        <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
          <KeyboardDatePicker
            disableToolbar
            fullWidth
            autoOk
            variant="inline"
            format="YYYY/MM/DD"
            margin="normal"
            value={value}
            onChange={(date, value) => props.onChange(value)}
            error={!isValid(value)}
            helperText={helperText}
          />
        </MuiPickersUtilsProvider>
      )
    default:
      return null;
  }
}

const MemberTable = props => {
  const dispatch = useDispatch();
  const addMember = newMember => dispatch(memberActions.addMember(newMember));
  const patchMember = (id, memberData) => dispatch(memberActions.patchMember(id, memberData));
  const deleteMember = id => dispatch(memberActions.deleteMember(id));
  const {height} = useWindowResize();
  const [memberClicked, setMemberClicked] = React.useState({});
  const [openKickMemberDialog, setOpenKickEditMemberDialog] = React.useState(false);
  const validRef = React.useRef({});
  const canAdd = props.role === 'leader' || props.role === 'manager';
  const canEdit = props.role === 'leader' || props.role === 'manager';
  const canKick = props.role === 'leader' || props.role === 'manager';
  const canDelete = props.role === 'leader' || props.role === 'manager';

  const members = props.members.map((m, i) => {
    let member = {
      _id: m._id,
      id: m.id,
      name: m.name,
      join_date: moment(m.join_date).format('YYYY/MM/DD')
    }
    if (props.showLeaveDate)
      member = {...member, leave_date: m.leave_date ? moment(m.leave_date).format('YYYY/MM/DD') : null};
    if (props.showKickReason)
      member = {...member, kick_reason: m.kick_reason ? m.kick_reason : null};
    return member;
  });

  const columns = [
    {
      title: "#", render: rowData => rowData ? rowData.tableData.id+1 : '', editable: 'never', width: '1%'
    },
    {
      title: "ID", field: "id", editComponent: props =>
        <MemberTableEditField
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
        <MemberTableEditField
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
        <MemberTableEditField
          {...props}
          required
          type='date'
          validRef={validRef}
        />
    }
  ]
  if (props.showLeaveDate) columns.push(
    {
      title: "退出日期", field: "leave_date", editComponent: props =>
        <MemberTableEditField
          {...props}
          requiredDependentOn='kick_reason'
          type='date'
          validRef={validRef}
        />
    }
  );
  if (props.showKickReason) columns.push(
    {
      title: "踢除原因", field: "kick_reason", editComponent: props =>
        <MemberTableEditField
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
      <KickMemberDialog member={memberClicked} open={openKickMemberDialog} setOpen={setOpenKickEditMemberDialog} />
      <MaterialTable
        title="戰隊成員"
        icons={tableIcons}
        columns={columns}
        data={members}
        onOrderChange={(orderBy, orderDir) => {
          console.log(orderBy, orderDir);
          
        }}
        actions={props.showLeaveDate || props.showKickReason || !canKick ? [] : [
          {
            icon: () => <UserX />,
            tooltip: '踢除',
            onClick: (event, member) => {
              setMemberClicked(member);
              setOpenKickEditMemberDialog(true);
            }
          }
        ]}
        editable={{
          onRowAdd: canAdd ? oldData =>
            new Promise((resolve, reject) => {
              if (!Object.values(validRef.current).every((v) => v === true)) {
                reject();
                return;
              }
              let newMember = {...oldData, team: props.team._id}
              addMember(newMember);
              resolve();
            }) : null,
          onRowUpdate: canEdit ? (newData, oldData) =>
            new Promise((resolve, reject) => {
              if (!Object.values(validRef.current).every((v) => v === true)) {
                reject();
                return;
              }
              if (deepEqual(oldData, newData)) {
                resolve();
                return;
              }
              let newMember = Object.filter(newData, ['id', 'name', 'join_date', 'leave_date', 'kick_reason']);
              patchMember(oldData._id, newMember);
              validRef.current = {};
              reject();
            }) : null,
          onRowDelete: canDelete ? oldData =>
            new Promise((resolve, reject) => {
              deleteMember(oldData._id);
              reject();
            }) : null,
        }}
        options={{
          actionsColumnIndex: -1,
          paging: false,
          maxBodyHeight: height - 300,
          headerStyle: {position: 'sticky', top: 0},
          addRowPosition: 'first'
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

export default React.memo(MemberTable, (prevProps, nextProps) => deepEqual(prevProps, nextProps));