import React, { useState, useReducer } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { reducer, initialState } from "../context/reducer";
import { subjectCreate } from "../context";

export default function CreateSub() {
  const [open, setOpen] = React.useState(false);
  const [access, dispatch] = useReducer(reducer, initialState);
  const [sub, setSub] = useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    subjectCreate(dispatch,sub);

  };
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Create Subject
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create Subject</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="createsub"
              value={sub || ""}
              label="Create Subject"
              type="text"
              fullWidth
              onChange={(e) => setSub(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleClose} color="primary">
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
