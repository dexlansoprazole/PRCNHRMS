import React from 'react';
import {useSelector} from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


const Alert = () => {
  const alert = useSelector(state => state.notification.alert);
  const [snackPack, setSnackPack] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [alertInfo, setAlertInfo] = React.useState(undefined);

  React.useEffect(() => {
    if(alert && alert.type !== 'success')
      setSnackPack((prev) => [...prev, alert]);
  }, [alert]);

  React.useEffect(() => {
    if (snackPack.length && !alertInfo) {
      // Set a new snack when we don't have an active one
      setAlertInfo(snackPack[0]);
      setSnackPack((prev) => prev.slice(1));
      setOpen(true);
    } else if (snackPack.length && alertInfo && open) {
      // Close an active snack when a new one is added
      setOpen(false);
    }
  }, [snackPack, alertInfo, open]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleExited = () => {
    setAlertInfo(undefined);
  }

  return (
    <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'center'}} open={open} onClose={handleClose} onExited={handleExited} autoHideDuration={alertInfo && alertInfo.type === 'error' ? undefined : 2000}>
      {
        alertInfo ? 
          <MuiAlert severity={alertInfo.type} onClose={handleClose}>
            {alertInfo.msg}
          </MuiAlert>
          : null
      }
    </Snackbar>
  );
}

export default Alert;