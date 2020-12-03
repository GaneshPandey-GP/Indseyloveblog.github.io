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
  MenuItem,
  Select,
  InputLabel,
  Input,
  FormControl,
  makeStyles,
  DialogTitle,
} from "@material-ui/core";
import QueueIcon from "@material-ui/icons/Queue";


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
}));

export default function CreateSub() {
  const [open, setOpen] = React.useState(false);
  const [{ isAuthenticated, loading, categories }, dispatch] = useAuthState();
  const [valueError, setValueError] = React.useState("");

  const [sub, setSub] = useState("");
  const [categoryid, setCategoryid] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleInputChange = (e) => {
    setCategoryid(String(e.target.value) || "");
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (sub === "") setValueError("Enter the subject name!");
    else subjectCreate(dispatch, sub, categoryid);
    if (valueError === "") handleClose();
  }

  const classes = useStyles()
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
        <form onSubmit={handleSubmit} style={{ minWidth: 300 }}>
        <DialogTitle>Create a new Subject</DialogTitle>
          <DialogContent>
            <FormControl className={classes.formControl}>
              <TextField
                autoFocus
                margin="dense"
                id="createsub"
                value={sub || ""}
                label="Subject name"
                type="text"
                fullWidth
                onChange={(e) => setSub(e.target.value)}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id="select-category-label">Category</InputLabel>
              <Select
                id="select-category"
                defaultValue=""
                value={categoryid}
                onChange={(e) => handleInputChange(e)}
                input={<Input id="select-category-label" />}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {categories.map(({ categoryid, categoryName }) => (
                  <MenuItem key={categoryid} value={categoryid}>
                    {categoryName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
