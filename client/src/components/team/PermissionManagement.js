import React from 'react';
import {useSelector} from 'react-redux';
import {Container, Grid, Tab, Tabs, Paper} from '@material-ui/core';
import {withStyles} from '@material-ui/styles';
import JoinedUserTable from './JoinedUserTable';
import RequestingUserTable from './RequestingUserTable';

const StyledTabs = withStyles(theme => ({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > span': {
      width: '100%',
      backgroundColor: theme.palette.primary.main,
    },
  },
}))((props) => <Tabs {...props} TabIndicatorProps={{children: <span />}} />);

const PermissionManagement = () => {
  const [tabSelected, setTabSelected] = React.useState(0);
  const user = useSelector(state => state.user);
  const teamSelected = useSelector(state => state.teamSelected);
  const team = useSelector(state => state.teams).find(t => t._id === teamSelected);
  if (!team)
    return null;
  const role = team.users.leader._id === user._id ? 'leader' : team.users.managers.find(m => m._id === user._id) ? 'manager' : team.users.members.find(m => m._id === user._id) ? 'member' : null;

  const handleTabChange = (event, newValue) => {
    setTabSelected(newValue);
  };

  const renderTab = () => {
    switch (tabSelected) {
      case 0:
        return <JoinedUserTable team={team} role={role} />;
      case 1:
        return <RequestingUserTable team={team} role={role} />;
      default:
        return null;
    }
  }

  return (
    <Container maxWidth='lg'>
      <Grid container spacing={3} direction='column'>
        <Grid item>
          <Paper>
            <StyledTabs value={tabSelected} onChange={handleTabChange} variant="fullWidth">
              <Tab label="已加入" />
              <Tab label="申請中" />
            </StyledTabs>
          </Paper>
        </Grid>
        <Grid item>
          {renderTab()}
        </Grid>
      </Grid>
    </Container>
  );
}

export default PermissionManagement;
