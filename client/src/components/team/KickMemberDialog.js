import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import {Box, Button, Dialog, DialogTitle, DialogActions, Grid} from '@material-ui/core';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import memberActions from '../../actions/member';

const KickMemberDialog = (props) => {
  const dispatch = useDispatch();
  const patchMember = async (id, data) => dispatch(memberActions.patchMember(id, data));
  const member = props.member;

  const [kickData, setKickData] = useState({
    kick_reason: "",
    leave_date: moment().format('YYYY/MM/DD')
  });

  const handleChange = (evt) => {
    const target = evt.target;
    const name = target.name;
    const value = target.value;

    setKickData({
      ...kickData,
      [name]: value
    });
  }

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleExited = (evt) => {
    setKickData({
      kick_reason: "",
      leave_date: moment().format('YYYY/MM/DD')
    })
  }

  const handleSubmit = (evt) => {
    new Promise(async (resolve, reject) => {
      if (!moment(kickData.leave_date, "YYYY/MM/DD", true).isValid()) {
        reject();
        return;
      }
      handleClose();
      props.setLoading(true);
      await patchMember(member._id, kickData);
      resolve();
    }).then(() => {
      props.setLoading(false);
    }).catch(() => {});
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
        踢除成員
      </DialogTitle>
      <ValidatorForm onSubmit={handleSubmit}>
        <Box px={3} py={1}>
          <Grid container direction='column' spacing={3}>
            <Grid item>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  fullWidth
                  variant="inline"
                  format="YYYY/MM/DD"
                  margin="normal"
                  label='退出日期'
                  required
                  invalidDateMessage='錯誤的日期格式'
                  value={kickData.leave_date}
                  onChange={(date, value) => {
                    setKickData({
                      ...kickData,
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
              autoFocus
              multiline
              value={kickData.kick_reason}
              onChange={handleChange}
              validators={['matchRegexp:^.{0,50}$']}
              errorMessages={['長度必須在50以內']}
            />
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

KickMemberDialog.propTypes = {
  member: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  setLoading: PropTypes.func
}

export default KickMemberDialog;