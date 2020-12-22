import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
} from "@material-ui/core";
import { useAuthState, createTest } from "../../context";
import EditIcon from "@material-ui/icons/Edit";
import Settime from "./Settime";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    minwidth: 100,
    flexWrap: "wrap",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
}));

export default function CreateTest() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [subid, setSubid] = React.useState("");
  const [{ subjects }, dispatch] = useAuthState();
  const [testName, setTestName] = useState("");
  const [testTime, setTestTime] = React.useState(0);
  const [valueError, setValueError] = React.useState("");
  const [startTestTime, setStartTestTime] = React.useState();
  const [endTestTime, setEndTestTime] = React.useState();
  const handleInputChange = (e) => {
    setSubid(String(e.target.value) || "");
  };

  const handleTestNameChange = (e) => {
    setTestName(e.target.value);
  };

  const handleTestTimeChange = (e) => setTestTime(e.target.value);

  const handleStartTimeChange = (e) => {
    const today = new Date(e.target.value);
    setStartTestTime(today.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
    //setStartTestTime(e.target.value);
  };

  const handleEndTimeChange = (e) => {
    const today = new Date(e.target.value);
    setEndTestTime(today.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
    // setEndTestTime(e.target.value);
  }
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (testName === "" || subid === "" || testTime <= 0)
      setValueError("Enter the valid values!");
    else {
      setValueError("");
      createTest(
        dispatch,
        testName,
        subid,
        testTime,
        startTestTime,
        endTestTime
      );
      resetForm();
      handleClose();
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const resetForm = () => {
    setSubid("");
    setTestName("");
    setTestTime("");
  };
  const today = new Date(startTestTime);
  return (
    <div>
      <ListItem button onClick={handleClickOpen}>
        <ListItemIcon>
          <EditIcon />
        </ListItemIcon>
        <ListItemText primary={"Create Test"} />
      </ListItem>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
      >
        <form
          className={classes.container}
          id="test-form"
          noValidate
          autoComplete="off"
        >
          <DialogTitle>Create a new test</DialogTitle>

          <DialogContent>
            <FormControl className={classes.formControl}>
              <TextField
                required
                id="testName"
                label="Name of the test"
                name="testName"
                type="text"
                value={testName || ""}
                autoComplete="testName"
                autoFocus
                onChange={(e) => handleTestNameChange(e)}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id="select-subject-label">Subject</InputLabel>
              <Select
                id="select-subject"
                defaultValue=""
                value={subid}
                onChange={(e) => handleInputChange(e)}
                input={<Input id="select-subject-label" />}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {subjects.map(({ subname, subid }) => (
                  <MenuItem key={subid} value={subid}>
                    {subname}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                required
                id="testTime"
                label="Time limit"
                helperText="(in minutes)"
                name="testTime"
                type="number"
                value={testTime || ""}
                autoComplete="testTime"
                autoFocus
                onChange={(e) => handleTestTimeChange(e)}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
            {startTestTime}
              <Settime
                onChange={handleStartTimeChange}
                label="Start Date & Time"
              />
            </FormControl>

            <FormControl className={classes.formControl}>
            {endTestTime}
              <Settime
                onChange={handleEndTimeChange}
                label="End  Date & Time"
              />
            </FormControl>
          </DialogContent>
        </form>
        {valueError ? (
          <p className="text-small text-danger ml-4">{valueError}</p>
        ) : (
          <p></p>
        )}
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleFormSubmit} color="primary" form="test-form">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
