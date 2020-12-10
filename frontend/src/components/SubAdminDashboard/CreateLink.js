import React, { useState } from "react";
import { createLink, useAuthState } from "../../context";
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

export default function CreateLink() {
  const [open, setOpen] = React.useState(false);
  const [{isAuthenticated, loading}, dispatch] = useAuthState()
  const [valueError, setValueError] = React.useState('')

  const [link, setLink] = useState("");
  const [linktitle, setLinkTitle] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (link === '')
      setValueError("Enter the Link")
    else
      setValueError("")
      createLink(dispatch, link, linktitle);
    if (valueError === '')
      handleClose()    
  };
  return (
    <div>
      <ListItem button onClick={handleClickOpen}>
        <ListItemIcon>
          <QueueIcon />
        </ListItemIcon>
        <ListItemText primary={"Create Link" } />
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
              id="linktitle"
              value={linktitle || ""}
              label="Input link title"
              type="text"
              fullWidth
              onChange={(e) => setLinkTitle(e.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="link"
              value={link || ""}
              label="Input link"
              type="text"
              fullWidth
              onChange={(e) => setLink(e.target.value)}
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