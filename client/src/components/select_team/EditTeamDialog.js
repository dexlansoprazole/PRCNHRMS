import React from 'react';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import {Box, Button, Dialog, DialogTitle, DialogActions} from '@material-ui/core';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import teamActions from '../../actions/team';

const EditTeamDialog = (props) => {
  const dispatch = useDispatch();
  const patchTeam = (id, teamData) => dispatch(teamActions.patchTeam(id, teamData));
  const [teamData, setTeamData] = React.useState({name: props.team.name});

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleChange = (evt) => {
    const name = evt.target.name;
    const value = evt.target.value;

    setTeamData({
      ...teamData,
      [name]: value
    });
  }

  const handleSubmit = (evt) => {
    patchTeam(props.team._id, teamData);
    handleClose();
  }

  return (
    <Dialog
      fullWidth={true}
      maxWidth={'xs'}
      open={props.open}
      onClose={handleClose}
      onClick={(e) => e.stopPropagation()}
    >
      <DialogTitle>
        編輯戰隊
      </DialogTitle>
      <ValidatorForm onSubmit={handleSubmit}>
        <Box px={3}>
          <TextValidator
            name="name"
            label="戰隊名稱"
            fullWidth
            value={teamData.name}
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
            確認
          </Button>
        </DialogActions>
      </ValidatorForm>
    </Dialog>
  );
}

EditTeamDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired
}

export default EditTeamDialog;