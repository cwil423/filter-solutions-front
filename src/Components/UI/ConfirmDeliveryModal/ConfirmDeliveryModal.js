import React, { useState } from 'react';
import Axios from 'axios';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Checkbox from '@material-ui/core/Checkbox';
import classes from './ConfirmDeliveryModal.module.css';

export default function ConfirmDelivery(props) {
  const [open, setOpen] = useState(false)
  const [completionStatus, setCompletionStatus] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    onCompleteHandler()
    setCompletionStatus(true)
  };

  const onCompleteHandler = () => {
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
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous location data to
            Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <Checkbox 
        className={classes.checkbox}
        // width={300}
        // style={{ width: 100 }}
        disabled={!completionStatus} 
        checked={completionStatus}
        color="primary"
      />
    </div>
  );
}