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

  const [sub, setSub] = useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    subjectCreate(dispatch, sub);
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
            <Button onClick={handleSubmit} color="primary">
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
