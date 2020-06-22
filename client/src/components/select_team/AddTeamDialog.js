import React from 'react';
import PropTypes from 'prop-types';
import {useSelector, useDispatch} from 'react-redux';
import {Box, Button, Dialog, DialogTitle, DialogActions} from '@material-ui/core';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import teamActions from '../../actions/team';

const AddTeamDialog = props => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const addTeam = (newTeam) => dispatch(teamActions.addTeam(newTeam));

  const [newTeam, setNewTeam] = React.useState({
    name: "",
    leader: user._id
  });

  const handleChange = (evt) => {
    const name = evt.target.name;
    const value = evt.target.value;

    setNewTeam({
      ...newTeam,
      [name]: value
    });
  }

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleExited = (evt) => {
    setNewTeam({
      name: "",
      leader: user._id
    })
  }

  const handleSubmit = (evt) => {
    addTeam(newTeam);
    handleClose();
  }

  return (
    <Dialog
      fullWidth={true}
      maxWidth={'xs'}
      open={props.open}
      onClose={handleClose}
      onExited={handleExited}
    >
      <DialogTitle>
        建立戰隊
      </DialogTitle>
      <ValidatorForm onSubmit={handleSubmit}>
        <Box px={3}>
          <TextValidator
            name="name"
            label="戰隊名稱"
            fullWidth
            value={newTeam.name}
            onChange={handleChange}
            validators={['required', 'matchRegexp:^.{2,10}$']}
            errorMessages={['必填', '長度必須在2到10之間']}
          />
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

AddTeamDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired
}

export default AddTeamDialog;
