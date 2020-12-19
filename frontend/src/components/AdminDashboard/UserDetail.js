import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { AccordionActions, Divider } from '@material-ui/core';
import UpdateUser from "./UpdateUser"

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    textAlign: 'center',
    fontSize: theme.typography.pxToRem(17),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function UserDetail({fname, lname, contact, email, testsGiven, uid}) {
  const classes = useStyles();
  return (
      <Accordion square >
      
        <AccordionSummary
          expandIcon={<VisibilityIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}> {fname} {lname}</Typography>
        
        </AccordionSummary>
        
      
        <AccordionDetails>

        <div>
       
        <ul className="list-group">
            <li className="list-group-item"><strong>First Name:</strong> {fname}</li>
            <li className="list-group-item"><strong>Last Name:</strong> {lname}</li>
            <li className="list-group-item"><strong>Contact:</strong> {contact}</li>
            <li className="list-group-item"><strong>Email:</strong> {email}</li>
            {testsGiven != "" ?
            <li className="list-group-item"><strong>Tests Given:</strong> {testsGiven}</li> : <></>}
            
        </ul>
        </div>
      
        </AccordionDetails>
        <AccordionActions className="d-flex justify-content-around">
        <Typography className={classes.heading}>Update User</Typography>
        <UpdateUser  ifname={fname} ilname={lname} iuid={uid} icontact={contact} iemail={email} itestsGiven={testsGiven} key={uid}/>

        </AccordionActions>
        <Divider />
      </Accordion>
  );
}
