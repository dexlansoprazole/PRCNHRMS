import React from 'react';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {Box, Grid, Button} from '@material-ui/core';
import {ChevronDown} from 'react-feather';
import SelectTeamDialog from './SelectTeamDialog';

const SelectTeamButton = () => {
  const history = useHistory();
  const team = useSelector(state => state.teamSelected);
  const [openSelectTeamDialog, setOpenSelectTeamDialog] = React.useState(false);

  React.useEffect(() => {
    setOpenSelectTeamDialog(false);
    history.push('/team/member/' + team._id);
  }, [team]);

  return (
    <Box>
      <SelectTeamDialog open={openSelectTeamDialog} setOpen={setOpenSelectTeamDialog} />
      <Button size='large' color='inherit' onClick={() => setOpenSelectTeamDialog(true)} style={{textTransform: 'none'}}>
        <Grid container spacing={1} alignItems='center'>
          <Grid item>
            {team.name}
          </Grid>
          <Grid item>
            <ChevronDown display='block' />
          </Grid>
        </Grid>
      </Button>
    </Box>
  );
}

export default SelectTeamButton;