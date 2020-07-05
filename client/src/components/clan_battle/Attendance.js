import React from 'react';
import {useSelector} from 'react-redux';
import {Container, Grid, Button, ButtonGroup} from '@material-ui/core';
import {useTheme} from '@material-ui/core/styles';
import AttendanceTable from '../AttendanceTable';

const memberFilters = {
  ALL: 'ALL',
  ACTIVE: 'ACTIVE',
  LEFT: 'LEFT'
}

const getVisibleMembers = (members, filter) => {
  switch (filter) {
    case memberFilters.ALL:
      return members.slice();
    case memberFilters.ACTIVE:
      return members.filter(m => (!m.leave_date && !m.kick_reason));
    case memberFilters.LEFT:
      return members.filter(m => (m.leave_date ? true : false || m.kick_reason ? true : false));
    default:
      return members.slice();
  }
}

const Attendance = () => {
  const theme = useTheme();
  const isSignedIn = useSelector(state => state.auth.isSignedIn);
  const user = useSelector(state => state.user);
  const teamSelected = useSelector(state => state.teamSelected);
  const team = useSelector(state => state.teams).find(t => t._id === teamSelected);
  const [memberFilter, setMemberFilter] = React.useState(memberFilters.ACTIVE);
  if (!team)
    return null;
  const role = team.users.leader._id === user._id ? 'leader' : team.users.managers.find(m => m._id === user._id) ? 'manager' : team.users.members.find(m => m._id === user._id) ? 'member' : null;

  const handleFilterClick = (e) => {
    setMemberFilter(e.target.name);
  }

  if (isSignedIn && team)
    return (
      <Container maxWidth='lg'>
        <Grid container direction='column' spacing={3}>
          <Grid container item justify='space-between'>
            <Grid item>
            </Grid>
            <Grid item style={{display: 'flex', alignItems: 'flex-end'}}>
              <ButtonGroup disableRipple disableElevation variant='contained'>
                <Button name={memberFilters.ACTIVE} onClick={handleFilterClick} style={{
                  backgroundColor: memberFilter === memberFilters.ACTIVE ? theme.palette.primary.main : theme.palette.background.paper,
                  color: theme.palette.getContrastText(memberFilter === memberFilters.ACTIVE ? theme.palette.primary.main : theme.palette.background.paper),
                  borderColor: theme.palette.type === 'dark' ? theme.palette.grey[700] : theme.palette.grey[300]
                }}>現役成員</Button>
                <Button name={memberFilters.LEFT} onClick={handleFilterClick} style={{
                  backgroundColor: memberFilter === memberFilters.LEFT ? theme.palette.primary.main : theme.palette.background.paper,
                  color: theme.palette.getContrastText(memberFilter === memberFilters.LEFT ? theme.palette.primary.main : theme.palette.background.paper),
                  borderColor: theme.palette.type === 'dark' ? theme.palette.grey[700] : theme.palette.grey[300]
                }}>已退出</Button>
                <Button name={memberFilters.ALL} onClick={handleFilterClick} style={{
                  backgroundColor: memberFilter === memberFilters.ALL ? theme.palette.primary.main : theme.palette.background.paper,
                  color: theme.palette.getContrastText(memberFilter === memberFilters.ALL ? theme.palette.primary.main : theme.palette.background.paper),
                  borderColor: theme.palette.type === 'dark' ? theme.palette.grey[700] : theme.palette.grey[300]
                }}>全部成員</Button>
              </ButtonGroup>
            </Grid>
          </Grid>
          <Grid item>
            <AttendanceTable
              team={team}
              members={getVisibleMembers(team.members, memberFilter)}
              role={role}
              loadingOn={['PATCH_USER', 'ADD_MEMBER', 'PATCH_MEMBER', 'DELETE_MEMBER']}
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

export default Attendance;