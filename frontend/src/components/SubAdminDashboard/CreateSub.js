import React, { useState } from "react";
import { subjectCreate, useAuthState } from "../../context";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Button,
} from "@material-ui/core";
import QueueIcon from "@material-ui/icons/Queue";

export default function CreateSub() {
  const [open, setOpen] = React.useState(false);
  const [{isAuthenticated, loading}, dispatch] = useAuthState()
  const [valueError, setValueError] = React.useState('')

  const [sub, setSub] = useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (sub === '')
      setValueError("Enter the subject name!")
    else
      subjectCreate(dispatch, sub);
    if (valueError === '')
      handleClose()    
  };
  return (
    <div>
      <ListItem button onClick={handleClickOpen}>
        <ListItemIcon>
          <QueueIcon />
        </ListItemIcon>
        <ListItemText primary={"Create Subject"} />
      </ListItem>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={handleSubmit} style={{minWidth: 300}}>
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
          {valueError ? <p className="text-small text-danger ml-4">{valueError}</p>: <p></p>}
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSubmit} color="primary">
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
