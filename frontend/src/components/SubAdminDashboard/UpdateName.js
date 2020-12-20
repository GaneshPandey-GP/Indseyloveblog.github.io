import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import { updateUserName, useAuthState } from '../../context';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { AccordionActions, Button, Divider, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
}));

export default function UpdateName({ifname, ilname}) {
  const [{user}, dispatch] = useAuthState()
  const [fname, setFname] = useState(ifname)
  const [lname, setLname] = useState(ilname)
  const [valueError, setValueError] = React.useState('')
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);



  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (fname === '' || lname === '')
      setValueError("Enter the values!")
    else
      setValueError("")
      updateUserName(dispatch, fname, lname);
  }

  return (
    <div className={classes.root}>

      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<EditOutlinedIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
        <div className="container d-flex justify-content-around ml-4">
            <Typography className={classes.heading}>{user[0].fname}</Typography>
            <Typography className={classes.heading}>{user[0].lname}</Typography>
        </div>
          
        </AccordionSummary>
        <AccordionDetails>
        <div className="ml-2">
          <TextField label="First Name" value={fname} onChange={(e) => setFname(e.target.value)}/>
          <TextField label="Last Name" value={lname} onChange={(e) => setLname(e.target.value)}/>
        </div>
        
        </AccordionDetails>
        <AccordionActions>
          {valueError ? <p className="text-small text-danger ml-4">{valueError}</p>: <p></p>}

          <Button size="small" color="primary" type="submit" onClick={handleSubmit}>
            Save
          </Button>
        </AccordionActions>
        <Divider />
      </Accordion>
    </div>
  );
}
