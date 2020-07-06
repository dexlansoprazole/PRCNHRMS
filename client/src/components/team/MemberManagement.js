import React from 'react';
import {useSelector} from 'react-redux';
import {Container, Grid} from '@material-ui/core';
import MemberTable from '../MemberTable';

const MemberManagement = () => {
  const isSignedIn = useSelector(state => state.auth.isSignedIn);
  const user = useSelector(state => state.user);
  const team = useSelector(state => state.teams.find(t => t._id === state.teamSelected));
  const loading = useSelector(state => ['ADD_MEMBER', 'PATCH_MEMBER', 'DELETE_MEMBER', 'PATCH_USER'].some(a => state.loading[a]));
  if (!team)
    return null;
  const role = team.users.leader._id === user._id ? 'leader' : team.users.managers.find(m => m._id === user._id) ? 'manager' : team.users.members.find(m => m._id === user._id) ? 'member' : null;

  if (isSignedIn && team)
    return (
      <Container maxWidth='lg'>
        <Grid container direction='column' spacing={3}>
          <Grid item>
            <MemberTable
              team={team}
              members={team.members}
              role={role}
              loadingOn={['ADD_MEMBER', 'PATCH_USER']}
            />
          </Grid>
        </Grid>
      </Container>
    );
  else
    return null;
}

export default MemberManagement;