import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, IconButton, Tooltip, Typography } from '@material-ui/core';
import {  useAuthState } from '../../context';
import FilterListIcon from '@material-ui/icons/FilterList';
import SubjectFilter from './SubjectFilter';
import axios from "axios";


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  header: {
    fontWeight: 'bold'
  }

});


export default function ViewTests() {
  const [{tests, subjects}, dispatch] = useAuthState()
  console.log(tests)





  // const getSubjectName = async(subid) => {
  //   const config = {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   };
  //   const body = {
  //     database: "ExaminationSystem",
  //     collection: "subjects",
  //     Filter:{
  //       subid
  //   }}
  //   try {
  //     const res = await axios.post("http://127.0.0.1:5001/getSubjects", body, config);
  //    return(res.data[0].subname)
  //   } catch (err) {
  //     console.log("went Wrong")
  //   }
  // }


  const classes = useStyles();

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
            <TableCell ></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tests.map(({testname, testid, subid, testtime}) => (
            <TableRow key={testid}>
              <TableCell component="th" scope="row">
                {testname}
              </TableCell>
              <TableCell component="th" scope="row">{subid}</TableCell>
              <TableCell component="th" scope="row">{testtime}</TableCell>
              <TableCell component="th" scope="row">
               <button type="button" className="btn btn-outline-info">Questions</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}
