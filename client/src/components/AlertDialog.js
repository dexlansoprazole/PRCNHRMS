import React from 'react';
import { Button, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText} from '@material-ui/core';

const AlertDialog = (props) => {
  const handleClose = () => {
    props.setOpen(false);
  };

  const handleConfirm = () => {
    props.action();
    handleClose();
  };

  return (
    <Dialog
      fullWidth={true}
      maxWidth={'xs'}
      open={props.open}
      onClose={handleClose}
      onClick={(e) => e.stopPropagation()}
    >
      <DialogTitle>
        {props.title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {props.content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>
          取消
        </Button>
        <Button color="primary" onClick={handleConfirm}>
          確認
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AlertDialog;
