import React from 'react';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import {Box, Button, Dialog, DialogTitle, DialogActions, Grid} from '@material-ui/core';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import memberActions from '../../actions/member';

const AddMemberDialog = (props) => {
  const dispatch = useDispatch();
  const addMember = newMember => dispatch(memberActions.addMember(newMember));
  const team = props.team;

  const [newMember, setNewMember] = React.useState({});

  React.useEffect(() => {
    setNewMember({
      id: "",
      name: "",
      team: team._id,
      join_date: moment().format("YYYY/MM/DD")
    });
  }, [team]);

  const handleChange = (evt) => {
    const target = evt.target;
    const name = target.name;
    const value = target.value;

    setNewMember({
      ...newMember,
      [name]: value
    });
  }

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleExited = (evt) => {
    setNewMember({
      id: "",
      name: "",
      team: team._id,
      join_date: moment().format("YYYY/MM/DD")
    })
  }

  const handleSubmit = (evt) => {
    if (moment(newMember.join_date, "YYYY/MM/DD", true).isValid()) {
      addMember(newMember);
      handleClose();
    }
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
        新增成員
      </DialogTitle>
      <ValidatorForm onSubmit={handleSubmit}>
        <Box px={3} py={1}>
          <Grid container direction='column' spacing={3}>
            <Grid item>
              <TextValidator
                name="id"
                label="ID"
                fullWidth
                autoFocus
                required
                value={newMember.id}
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
                value={newMember.name}
                onChange={handleChange}
                validators={['required', 'matchRegexp:^.{1,10}$']}
                errorMessages={['必填', '長度必須在1到10之間']}
              />
            </Grid>
            <Grid item>
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
                  value={newMember.join_date}
                  onChange={(date, value) => {
                    setNewMember({
                      ...newMember,
                      join_date: value
                    });
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
          </Grid>
        </Box>
        <DialogActions>
          <Button onClick={handleClose}>
            取消
          </Button>
          <Button color="primary" type='submit'>
            新增
          </Button>
        </DialogActions>
      </ValidatorForm>
    </Dialog>
  );
}

AddMemberDialog.propTypes = {
  team: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired
}

export default AddMemberDialog;