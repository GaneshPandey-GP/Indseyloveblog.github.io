import React, { useEffect, useState } from 'react'
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
import { ListItem, ListItemIcon, ListItemText, TextField, Typography } from '@material-ui/core';
import { useAuthState } from '../../context';
import { getSubjects } from '../../context/actions';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    minwidth: 400,
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
  const [subject, setSubject] = React.useState('');
  const [{subjects}, dispatch] = useAuthState()
  const [testName, setTestName] = useState('')
  const [subjectId, setSubjectId] = useState('')

  const handleInputChange = (e) => {
    setSubject(e.target.value || '')
    // console.log()
    console.log(subject)
  };

  const handleTestNameChange = (e) =>
    setTestName(e.target.value);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // createTest(dispatch, testname, subject.id);
    handleClose()
    console.log("testName =",testName, "subjectId=", subjectId)
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
        <form className={classes.container} id="test-form">
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
                <InputLabel htmlFor="select-subject-label">Subject</InputLabel>
                <Select
                  labelId="select-subject-label"
                  id="select-subject"
                  value={subject}
                  onChange={(e) => handleInputChange(e)}
                  input={<Input id="select-subject-label" />}
                >
                  {subjects.map(({subname, subid}) => 
                    <MenuItem key={subid} value={subname}>{subname}</MenuItem>
                  )}
                </Select>
              </FormControl>
          </DialogContent>
          </form>
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

