import React , { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Button, Typography } from '@material-ui/core';
import {  getTests4Admin, updateTest4Admin, useAuthState } from '../../context';
import Skeleton from '@material-ui/lab/Skeleton';
import FolderSharedIcon from '@material-ui/icons/FolderShared';
import UpdateUser from "./UpdateUser"
import ViewTests from '../SubAdminDashboard/ViewTests'
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    background:"#fff"
  },
  header: {
    fontWeight: 'bold'
  },
  link: {
    textDecoration: 'none',
  },
  btns:{
    className: "side_nav_item",
    "&:hover": {
      backgroundColor: "#7facea",
    },
    "&:active": {
      backgroundColor: "#777cea",
    },
  }
});


export default function ViewClients({clients}) {
  const [{loading}] = useAuthState()
  const classes = useStyles();
  const [toggle, setToggle] = useState(1)
  
  if (loading) return (<><Skeleton variant="rect" height={30}/><br/><Skeleton variant="rect" height={165} /></>)

  return (
    <>
    <div className="d-flex justify-content-between align-items-center">
      <Typography variant="h4" id="tableTitle" component="div">
      
      <Button  onClick={()=>{setToggle(2)}} className={classes.btns}> <AssignmentIndIcon/>  Clients</Button> / <Button className={classes.btns}   onClick={()=>{setToggle(1)}}> <FolderSharedIcon/>  Tests</Button> 
      </Typography>
      
      <Typography variant="h4" id="tableTitle" component="div">{toggle === 2 ? "Clients": "Tests"} </Typography>
    </div>
    {toggle  === 2 ? (<TableContainer>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.header}>First Name</TableCell>
            <TableCell className={classes.header}>Last Name</TableCell>
            <TableCell className={classes.header}>Contact</TableCell>
            <TableCell className={classes.header}>Email</TableCell>
            <TableCell className={classes.header}>Test Given</TableCell>
            <TableCell className={classes.header}>Update</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clients.map(({fname, lname, contact, email, testsGiven, uid}) => (
            <TableRow key={uid}>
              <TableCell component="th" scope="row">
                {fname}
              </TableCell>
              <TableCell component="th" scope="row">{lname}</TableCell>
              <TableCell component="th" scope="row">{contact}</TableCell>
              <TableCell component="th" scope="row">
              {email}
              </TableCell>
              <TableCell component="th" scope="row">
               [{ testsGiven.map((id, index) => (
                 id === testsGiven[(testsGiven.length)-1] ? <span key={index}>{id}</span> : <span key={index}>{id}, </span>
               )) }]
              </TableCell>
              <TableCell component="th" scope="row">
              <UpdateUser  ifname={fname} ilname={lname} iuid={uid} icontact={contact} iemail={email} itestsGiven={testsGiven} key={uid}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>): <ViewTests toggle={toggle} updateTest={updateTest4Admin} getTests={getTests4Admin}/> }
    </>
  );
}
