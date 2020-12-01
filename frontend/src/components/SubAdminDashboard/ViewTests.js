import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Typography } from '@material-ui/core';
import {  useAuthState } from '../../context';
import SubjectFilter from './SubjectFilter';
import UpdateTest from './UpdateTest';
import Skeleton from '@material-ui/lab/Skeleton';
import { Link } from 'react-router-dom';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  header: {
    fontWeight: 'bold'
  },
  link: {
    textDecoration: 'none',
  }

});


export default function ViewTests() {
  const [{tests, subjects, loading}, dispatch] = useAuthState()
  const classes = useStyles();

  if (loading) return (<><Skeleton variant="rect" height={30}/><br/><Skeleton variant="rect" height={165} /></>)

  return (
    <>
    <div className="d-flex justify-content-between">
      <Typography variant="h6" id="tableTitle" component="div">
        Tests
      </Typography>
      <SubjectFilter />
    </div>
    
    <TableContainer>

      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.header}>Name of the test</TableCell>
            <TableCell className={classes.header}>Subject</TableCell>
            <TableCell className={classes.header}>Duration(mins)</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tests.map(({testname, testid, subname, subjectid, testtime}) => (
            <TableRow key={testid}>
              <TableCell component="th" scope="row">
                {testname}
              </TableCell>
              <TableCell component="th" scope="row">{subname}</TableCell>
              <TableCell component="th" scope="row">{testtime}</TableCell>
              <TableCell component="th" scope="row">
               <Link to={{pathname: "/add-questions", testid, testname }} ><button type="button" className="btn btn-info">Questions</button></Link> 
              </TableCell>
              <TableCell component="th" scope="row">
               <UpdateTest initialTestName={testname} initialSubjectid={subjectid} initialTestTime={testtime} testid={testid}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}
