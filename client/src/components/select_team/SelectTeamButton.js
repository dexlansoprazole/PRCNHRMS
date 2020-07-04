import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {Box, Grid, Button} from '@material-ui/core';
import {ChevronDown} from 'react-feather';

const SelectTeamButton = props => {
  const team = useSelector(state => state.teams.find(t => t._id === state.teamSelected));

  return (
    <Box>
      <Button size='large' color='inherit' onClick={props.onClick} style={{textTransform: 'none'}}>
        <Grid container spacing={1} alignItems='center' wrap='nowrap'>
          <Grid item>
            {team ? team.name : '我的戰隊'}
          </Grid>
          <Grid item>
            <ChevronDown display='block' />
          </Grid>
        </Grid>
      </Button>
    </Box>
  );
}

SelectTeamButton.propTypes = {
  onClick: PropTypes.func
}

export default SelectTeamButton;