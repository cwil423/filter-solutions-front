import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import classes from './ConfirmationModal.module.css';

export default function ConfirmDelivery(props) {

  let hasButton = null
  if (props.hasButton) {
    hasButton = (
      <Button variant="contained" color="primary" size={props.buttonSize} onClick={props.modalOpen}>
        {props.buttonText}
      </Button>
    )
  }
  
  let hasCancelButton = null
  if (props.hasCancelButton) {
    hasCancelButton = (
      <Button onClick={() => props.modalClose(false)} color="primary">
        Cancel
      </Button>
    )
  }

  return (
    <div className={classes.confirmDelivery}>
      {hasButton}
      <Dialog
        open={props.modal}
        modalClose={props.modalClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {hasCancelButton}
          <Button onClick={() => props.modalClose(true)} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}