import React, { useState } from 'react';
import Axios from 'axios';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Checkbox from '@material-ui/core/Checkbox';
import classes from './ConfirmDelivery.module.css';

// Need to move most functionality into parent components

export default function ConfirmDelivery(props) {
  const [open, setOpen] = useState(false)
  const [completionStatus, setCompletionStatus] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (trueOrFalse) => {
    setOpen(false);
    if (trueOrFalse) {
      confirmDeliveryHandler()
      setCompletionStatus(true)
    }
  };

  const confirmDeliveryHandler = () => {
    setCompletionStatus(true)
      Axios.post('http://localhost:4000/mongoDb', {
        name: props.name,
        address: props.readableAddress
      }).then(response => console.log(response))
  }

  return (
    <div className={classes.confirmDelivery}>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Confirm Delivery
      </Button>
      <Dialog
        open={open}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delivery confirmation."}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`Confirm delivery to ${props.readableAddress}?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleClose(true)} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Checkbox 
        className={classes.checkbox}
        disabled={!completionStatus} 
        checked={completionStatus}
        color="primary"
      />
    </div>
  );
}