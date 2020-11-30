import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { ListItem, ListItemIcon, ListItemText, TextField } from '@material-ui/core';
import { useAuthState } from '../../context';
import EditIcon from '@material-ui/icons/Edit';
import { createTest } from '../../context/actions';
import Loading from '../Loading';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    minwidth: 100,
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
}));

export default function CreateTest() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [subjectid, setSubjectid] = React.useState('');
  const [{subjects}, dispatch] = useAuthState()
  const [testName, setTestName] = useState('')
  const [testTime, setTestTime] = React.useState(0)
  const [valueError, setValueError] = React.useState('')

  const handleInputChange = (e) => {
    setSubjectid(String(e.target.value) || '');
  };

  const handleTestNameChange = (e) =>{
    setTestName(e.target.value);
  }

  const handleTestTimeChange = (e) =>
    setTestTime(e.target.value);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if ( testName === '' || subjectid === '' || testTime <= 0 ) 
      setValueError("Enter the valid values!")
      else {
        setValueError("")
        createTest(dispatch, testName, subjectid, testTime)
      }
    if (valueError === '')
      handleClose()    
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <ListItem button onClick={handleClickOpen}>
        <ListItemIcon>
          <EditIcon />
        </ListItemIcon>
        <ListItemText primary={"Create Test"} />
      </ListItem>
      <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
        <form className={classes.container} id="test-form"  noValidate autoComplete="off">
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
                  value={subjectid}
                  onChange={(e) => handleInputChange(e)}
                  input={<Input id="select-subject-label" />}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {subjects.map(({subname, subid}) =>
                    <MenuItem key={subid} value={subid} >{subname}</MenuItem>
                  )}
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
          </DialogContent>
          </form>
          {valueError ? <p className="text-small text-danger ml-4">{valueError}</p>: <p></p>}
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
