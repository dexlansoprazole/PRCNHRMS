import React from 'react';
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';
import { Container, Grid } from '@material-ui/core';
import AttendanceTable from '../AttendanceTable';

const getVisibleMembers = (members) => {
  return members.filter(m => (!m.leave_date && !m.kick_reason));
}

const Attendance = () => {
  const history = useHistory();
  const isSignedIn = useSelector(state => state.auth.isSignedIn);
  const user = useSelector(state => state.user);
  const teamSelected = useSelector(state => state.teamSelected);
  const team = useSelector(state => state.teams).find(t => t._id === teamSelected);
  if (!team) {
    history.push('/home');
    return null;
  }
  const role = team.users.leader._id === user._id ? 'leader' : team.users.managers.find(m => m._id === user._id) ? 'manager' : team.users.members.find(m => m._id === user._id) ? 'member' : null;

  if (isSignedIn && team)
    return (
      <Container maxWidth='lg'>
        <Grid container direction='column' spacing={3}>
          <Grid item>
            <AttendanceTable
              team={team}
              members={getVisibleMembers(team.members)}
              role={role}
              loadingOn={['PATCH_TEAM_SELECTED', 'ADD_MEMBER', 'DELETE_MEMBER']}
              showLeaveDate={false}
              showKickReason={false}
            />
          </Grid>
        </Grid>
      </Container>
    );
  else
    return null;
}

export default Attendance;