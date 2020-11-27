import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import { IconButton, Tooltip } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import { useAuthState } from '../../context';
import { getTests } from '../../context/actions';


function SubjectList(props) {
  const [{subjects}, dispatch] = useAuthState()
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (e, value) => {
      console.log(value)
    e.preventDefault()
    getTests(dispatch, value)
    onClose(value);
  }

  return (
    <Dialog onClose={handleClose} aria-labelledby="select-subject" open={open}>
      <DialogTitle id="select-subject">Select a subject</DialogTitle>
      <List>
        <ListItem button onClick={() => handleListItemClick(null)}>
        <ListItemText primary="All" />
        </ListItem>
        {subjects.map(({subname, subid}) => (
          <ListItem button onClick={(e) => handleListItemClick(e, subid)} key={subid}>
            <ListItemText primary={subname} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}



export default function SubjectFilter() {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <Tooltip title="Filter list">
        <IconButton aria-label="filter list"  onClick={handleClickOpen}>
          <FilterListIcon />
        </IconButton>
      </Tooltip>
      <SubjectList selectedValue={selectedValue} open={open} onClose={handleClose} />
    </div>
  );
}


SubjectList.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};