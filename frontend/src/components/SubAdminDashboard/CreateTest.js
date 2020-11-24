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
import { ListItem, ListItemIcon, ListItemText, TextField } from '@material-ui/core';
import { useAuthState } from '../../context';
import { getSubjects } from '../../context/actions';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function TestForm() {
  const [formData, setFormData] = useState({
    testname: "",
    subject: "",
  });
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [subject, setSubject] = React.useState('');
  const [{subjects}, dispatch] = useAuthState()

  useEffect(() => {
      getSubjects(dispatch)
  }, [dispatch])

  const handleChange = (e) => {
    setSubject(e.target.value || '');
  };

  const handleInputChange = (e) =>
  setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // createTest(dispatch, testname, subject.id);
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

        <DialogTitle>Create a new test</DialogTitle>
        <form className={classes.container}>
          <DialogContent>
              <FormControl className={classes.formControl}>
                <TextField id="testName" label="Name of the test" />
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel id="select-subject-label">Subject</InputLabel>
                <Select
                  labelId="select-subject-label"
                  id="select-subject"
                  value={subject}
                  onChange={handleChange}
                  input={<Input />}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {subjects.map(({name, id}) => 
                      <MenuItem key={id} value={name} onChange={(e) => handleInputChange(e)}>{name}</MenuItem>
                  )}
                </Select>
              </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleClose} color="primary">
              Ok
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

