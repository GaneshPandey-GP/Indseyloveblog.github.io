import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { AccordionActions, Button, Divider, TextField } from '@material-ui/core';
import { updateSubject } from '../../context/actions';
import { useAuthState } from '../../context';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function UpdateSub({subname, subid}) {
  const [sub, setSub] = useState("");
  const [{isAuthenticated, loading}, dispatch] = useAuthState()

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(sub)
    updateSubject(dispatch, subid, subname=sub);
    // handleClose()
  }

  const classes = useStyles();
  return (
    <form className={classes.root} onSubmit={handleSubmit} noValidate autoComplete="off">
      <Accordion square >
        <AccordionSummary
          expandIcon={<EditOutlinedIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>{subname}</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <TextField id={subname} label={subname} onChange={(e) => setSub(e.target.value)}/>
        </AccordionDetails>
        <AccordionActions>
          <Button size="small" color="primary" type="submit" onClick={handleSubmit}>
            Save
          </Button>
        </AccordionActions>
        <Divider />
      </Accordion>
    </form>
  );
}
