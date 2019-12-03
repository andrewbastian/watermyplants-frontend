import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { deletePlant } from '../actions/plants'
import { connect } from "react-redux";

function DeleteMyPlant(id, props) {
  const [state, setState] = React.useState(id)

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  console.log(id)
  const handleDelete = (event) => {
    event.preventDefault();
    id.deletePlant(state)
  }
  return (
    <div>
      <Button variant="" color="primary" onClick={handleClickOpen}>
        Delete
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete This Plant?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">

            Are you sure you would like to delete this plant? This action cannot be undone.
        </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );

}

const mapDispatchToProps = {
    deletePlant
  };

export default connect(
    null,
    mapDispatchToProps
)(DeleteMyPlant);
