import React from 'react';
import PropTypes from 'prop-types';
import {useSelector, useDispatch} from 'react-redux';
import {Box, Button, Dialog, DialogTitle, DialogActions, AppBar, Tab, Tabs} from '@material-ui/core';
import {Plus} from 'react-feather';
import AddTeamDialog from './AddTeamDialog';
import SearchTeam from './SearchTeam';
import MyTeamTable from './MyTeamTable';
import MyRequestTable from './MyRequestTable';
import userActions from '../../actions/user';

const SelectTeamDialog = props => {
  const team = useSelector(state => state.teams.find(t => t._id === state.teamSelected));
  const [openAddTeamDialog, setOpenAddTeamDialog] = React.useState(false);
  const [tabSelected, setTabSelected] = React.useState(0);
  const [teamSelected, setTeamSelected] = React.useState(null);
  const dispatch = useDispatch();
  const patchTeamSelected = (team_id) => dispatch(userActions.patchTeamSelected(team_id));

  React.useEffect(() => {
    setTeamSelected(team);
  }, [team]);

  const handleChange = (event, newValue) => {
    setTabSelected(newValue);
  };

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleExited = () => {
    setTabSelected(0);
    setTeamSelected(team);
  }

  const handleSelect = () => {
    if (teamSelected && teamSelected._id) {
      handleClose();
      patchTeamSelected(teamSelected._id);
    }
  };

  const handleLinkClick = (teamData) => {
    if (teamData) {
      handleClose();
      patchTeamSelected(teamData._id);
    }
  }

  const renderTab = () => {
    switch (tabSelected) {
      case 0:
        return <MyTeamTable teamSelected={teamSelected} setTeamSelected={setTeamSelected} onLinkClick={handleLinkClick} toolbar={false} />;
      case 1:
        return <SearchTeam />;
      case 2:
        return <MyRequestTable toolbar={false} />;
      default:
        return null;
    }
  }

  return (
    <Dialog
      fullWidth={true}
      maxWidth={'md'}
      open={props.open}
      onClose={handleClose}
      onExited={handleExited}
      disableBackdropClick={props.disableBackdropClick}
      disableEscapeKeyDown={props.disableEscapeKeyDown}
    >
      <DialogTitle>
        <Box display='flex'>
          <Box flexGrow={1}>????????????</Box>
          <Button
            startIcon={<Plus />}
            onClick={() => setOpenAddTeamDialog(true)} color='primary'
          >
            ????????????
          </Button>
          <AddTeamDialog open={openAddTeamDialog} setOpen={setOpenAddTeamDialog} />
        </Box>
      </DialogTitle>
      <Box height={'50vh'} display='flex' flexDirection='column'>
        <Box>
          <AppBar position="static" style={{boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)'}}>
            <Tabs value={tabSelected} onChange={handleChange}>
              <Tab label="????????????" />
              <Tab label="????????????" />
              <Tab label="?????????" />
            </Tabs>
          </AppBar>
        </Box>
        {renderTab()}
      </Box>
      <DialogActions>
        {tabSelected === 0 ?
          <Box p={1} display='flex' justifyContent='flex-end'>
            <Button onClick={handleClose}>
              ??????
              </Button>
            <Button onClick={handleSelect} color="primary" disabled={!teamSelected}>
              ??????
              </Button>
          </Box>
          : <Box height={52} />}
      </DialogActions>
    </Dialog>
  );
}

SelectTeamDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  disableBackdropClick: PropTypes.bool,
  disableEscapeKeyDown: PropTypes.bool,
}

SelectTeamDialog.defaultProps = {
  open: true,
  disableBackdropClick: false,
  disableEscapeKeyDown: false,
}

export default SelectTeamDialog;