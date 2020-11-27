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
import { TextField } from '@material-ui/core';
import { useAuthState } from '../../context';
import EditIcon from '@material-ui/icons/Edit';
import { updateTest } from '../../context';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

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

export default function UpdateTest({initialTestTime, initialSubjectid, initialTestName, testid}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [subid, setSubid] = React.useState(parseInt(initialSubjectid));
  const [{subjects}, dispatch] = useAuthState()
  const [testname, setTestname] = useState(initialTestName)
  const [testtime, setTesttime] = React.useState(initialTestTime)
  const [valueError, setValueError] = React.useState()

  const handleInputChange = (e) => {
    setSubid(String(e.target.value) || '');
  };

  const handleTestnameChange = (e) =>{
    setTestname(e.target.value);
  }

  const handleTesttimeChange = (e) =>
    setTesttime(e.target.value);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if ( testname === '' || subid === '' || testtime === 0 ) 
      setValueError("Enter all the values!")
      else {
        updateTest(dispatch, testname, testid, testtime, subid)
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
      <EditOutlinedIcon onClick={handleClickOpen} style={{cursor: 'pointer'}}/>
      <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
        <form className={classes.container} id="test-form"  noValidate autoComplete="off">
        <DialogTitle>Create a new test</DialogTitle>

          <DialogContent>
              <FormControl className={classes.formControl}>
                <TextField
                  required
                  id="testname"
                  label="Name of the test"
                  name="testname"
                  type="text"
                  value={testname}
                  autoComplete="testname"
                  autoFocus
                  onChange={(e) => handleTestnameChange(e)}
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
                  {subjects.map(({subname, subid}) =>
                    <MenuItem key={subid} value={subid} >{subname}</MenuItem>
                  )}
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <TextField
                  required
                  id="testtime"
                  label="Time limit"
                  helperText="(in minutes)"
                  name="testtime"
                  type="number"
                  value={testtime}
                  autoComplete="testtime"
                  autoFocus
                  onChange={(e) => handleTesttimeChange(e)}
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
