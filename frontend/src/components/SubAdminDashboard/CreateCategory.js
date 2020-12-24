import React, { useState } from "react";
import { createCategory, useAuthState } from "../../context";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Button,
  DialogTitle,
} from "@material-ui/core";
import QueueIcon from "@material-ui/icons/Queue";

export default function CreateCategory() {
  const [open, setOpen] = React.useState(false);
  const [{}, dispatch] = useAuthState();
  const [valueError, setValueError] = React.useState("");

  const [categoryName, setCategory] = useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (categoryName === "") setValueError("Enter the Category");
    else {
      setValueError("");
      createCategory(dispatch, categoryName);
      resetForm();
      handleClose();
    }
  };
  const resetForm = () => {
    setCategory("");
  };
  return (
    <div>
      <ListItem button onClick={handleClickOpen}>
        <ListItemIcon>
          <QueueIcon />
        </ListItemIcon>
        <ListItemText primary={"Create category"} />
      </ListItem>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle>Create a new category</DialogTitle>

        <form onSubmit={handleSubmit} style={{ minWidth: 300 }}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="createcategory"
              value={categoryName || ""}
              label="Create Category"
              type="text"
              fullWidth
              onChange={(e) => setCategory(e.target.value)}
            />
          </DialogContent>
          {valueError ? (
            <p className="text-small text-danger ml-4">{valueError}</p>
          ) : (
            <p></p>
          )}
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
