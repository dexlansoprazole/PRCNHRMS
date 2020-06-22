import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {Container, Grid, Box, Button, ButtonGroup, Paper} from '@material-ui/core';
import MemberTable from './MemberTable';
import AddMemberDialog from './AddMemberDialog';
// import EditMemberModal from './EditMemberModal';
// import KickMemberModal from './KickMemberModal';
// import DeleteMemberModal from './DeleteMemberModal';

const memberFilters = {
  ALL: 'ALL',
  ACTIVE: 'ACTIVE',
  LEFT: 'LEFT'
}

const getVisibleMembers = (members, filter) => {
  switch (filter) {
    case memberFilters.ALL:
      return members;
    case memberFilters.ACTIVE:
      return members.filter(m => m.leave_date == null);
    case memberFilters.LEFT:
      return members.filter(m => m.leave_date != null);
    default:
      return members;
  }
}

const MemberManagement = (props) => {
  const {team_id} = useParams();
  const isSignedIn = useSelector(state => state.auth.isSignedIn);
  const user = useSelector(state => state.user);
  const team = useSelector(state => state.teams).find(t => t._id === team_id);
  const role = team.users.leader._id === user._id ? 'leader' : team.users.managers.find(m => m._id === user._id) ? 'manager' : team.users.members.find(m => m._id === user._id) ? 'member' : null;

  const [memberFilter, setMemberFilter] = useState(memberFilters.ACTIVE);
  const [openAddMemberDialog, setOpenAddMemberDialog] = useState(false);

  const handleFilterClick = (e) => {
    setMemberFilter(e.target.name);
  }

  if (isSignedIn && team)
    return (
      <Container maxWidth='lg'>
        <AddMemberDialog team={team} open={openAddMemberDialog} setOpen={setOpenAddMemberDialog}></AddMemberDialog>
        <Grid container direction='column' spacing={3}>
          <Grid container item justify='space-between'>
            <Grid item>
              {
                role === 'leader' || role === 'manager' ?
                  <Button color='primary' variant='contained' disableElevation onClick={() => {setOpenAddMemberDialog(true)}}>新增成員</Button>
                  : null
              }
            </Grid>
            <Grid item>
              <ButtonGroup >
                <Button name={memberFilters.ACTIVE} onClick={handleFilterClick}>現役成員</Button>
                <Button name={memberFilters.LEFT} onClick={handleFilterClick}>已退出</Button>
                <Button name={memberFilters.ALL} onClick={handleFilterClick}>全部成員</Button>
              </ButtonGroup>
            </Grid>
          </Grid>
          <Grid item>
            <MemberTable
              members={getVisibleMembers(team.members, memberFilter)}
              role={props.role}
              showLeaveDate={memberFilter !== memberFilters.ACTIVE}
              showKickReason={memberFilter !== memberFilters.ACTIVE}
            />
          </Grid>
        </Grid>
      </Container>
    );
  else
    return null;
}

export default MemberManagement;