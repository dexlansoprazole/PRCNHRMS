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
    if (!team._id)
      setOpenSelectTeamDialog(true);
    else {
      setOpenSelectTeamDialog(false);
      history.push('/team/member/' + team._id);
    }
  }, [team]);

  return (
    <Box>
      <SelectTeamDialog
        open={openSelectTeamDialog}
        setOpen={setOpenSelectTeamDialog}
        disableBackdropClick={team._id ? false : true}
        disableEscapeKeyDown={team._id ? false : true} />
      <Button size='large' color='inherit' onClick={() => setOpenSelectTeamDialog(true)} style={{textTransform: 'none'}}>
        <Grid container spacing={1} alignItems='center' wrap='nowrap'>
          <Grid item>
            {team.name ? team.name : '我的戰隊'}
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