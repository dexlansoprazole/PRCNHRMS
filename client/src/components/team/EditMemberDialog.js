import React from 'react';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import {Box, Button, Dialog, DialogTitle, DialogActions, Grid} from '@material-ui/core';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import memberActions from '../../actions/member';

const EditMemberDialog = (props) => {
  const dispatch = useDispatch();
  const patchMember = (id, memberData) => dispatch(memberActions.patchMember(id, memberData));
  const member = props.member;

  const [memberData, setMemberData] = React.useState({
    id: member.id,
    name: member.name,
    join_date: member.join_date,
    leave_date: member.leave_date,
    kick_reason: member.kick_reason
  });

  React.useEffect(() => {
    console.log(member);
    setMemberData({
      id: member.id,
      name: member.name,
      join_date: member.join_date,
      leave_date: member.leave_date,
      kick_reason: member.kick_reason
    });
  }, [member]);

  const handleChange = (evt) => {
    const target = evt.target;
    const name = target.name;
    const value = target.value;

    setMemberData({
      ...memberData,
      [name]: value
    });
  }

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleExited = (evt) => {
    setMemberData({
      id: member.id,
      name: member.name,
      join_date: member.join_date,
      leave_date: member.leave_date,
      kick_reason: member.kick_reason
    });
  }

  const handleSubmit = (evt) => {
    if (!moment(memberData.join_date, "YYYY/MM/DD", true).isValid()) return;
    if (memberData.leave_date != null && !moment(memberData.leave_date, "YYYY/MM/DD", true).isValid()) return;
    patchMember(member._id, memberData);
    handleClose();
  }

  return (
    <Dialog
      fullWidth={true}
      maxWidth={'sm'}
      open={props.open}
      onClose={handleClose}
      onExited={handleExited}
    >
      <DialogTitle>
        編輯成員
      </DialogTitle>
      <ValidatorForm onSubmit={handleSubmit}>
        <Box px={3} py={1}>
          <Grid container direction='column' spacing={3}>
            <Grid item>
              <TextValidator
                name="id"
                label="ID"
                fullWidth
                required
                value={memberData.id}
                onChange={handleChange}
                validators={['required', 'matchRegexp:^\\d{9}$']}
                errorMessages={['必填', '必須為9位數字']}
              />
            </Grid>
            <Grid item>
              <TextValidator
                name="name"
                label="暱稱"
                fullWidth
                required
                value={memberData.name}
                onChange={handleChange}
                validators={['required', 'matchRegexp:^.{1,10}$']}
                errorMessages={['必填', '長度必須在1到10之間']}
              />
            </Grid>
            <Grid container item spacing={3}>
              <Grid item xs={6}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    fullWidth
                    required
                    variant="inline"
                    format="YYYY/MM/DD"
                    margin="normal"
                    label='加入日期'
                    invalidDateMessage='錯誤的日期格式'
                    value={memberData.join_date}
                    onChange={(date, value) => {
                      setMemberData({
                        ...memberData,
                        join_date: value
                      });
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={6}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    fullWidth
                    variant="inline"
                    format="YYYY/MM/DD"
                    margin="normal"
                    label='退出日期'
                    required={memberData.kick_reason != null}
                    invalidDateMessage='錯誤的日期格式'
                    value={memberData.leave_date}
                    onChange={(date, value) => {
                      setMemberData({
                        ...memberData,
                        leave_date: value
                      });
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
            </Grid>
            <Grid item>
              <TextValidator
                name="kick_reason"
                label="踢除原因"
                fullWidth
                value={memberData.kick_reason}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </Box>
        <DialogActions>
          <Button onClick={handleClose}>
            取消
          </Button>
          <Button color="primary" type='submit'>
            完成
          </Button>
        </DialogActions>
      </ValidatorForm>
    </Dialog>
  );
}

EditMemberDialog.propTypes = {
  member: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired
}

export default EditMemberDialog;