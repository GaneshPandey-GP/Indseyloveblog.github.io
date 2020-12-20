import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Typography } from "@material-ui/core";
import { useAuthState } from "../../context";
import SubjectFilter from "./SubjectFilter";
import UpdateTest from "./UpdateTest";
import Skeleton from "@material-ui/lab/Skeleton";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    background: "#fff",
  },
  header: {
    fontWeight: "bold",
  },
  link: {
    textDecoration: "none",
  },
});



export default function ViewTests(props) {
  const [{tests, loading}, dispatch] = useAuthState()

  const classes = useStyles();

  const clickHandler = (testid, testname, createdBy) => {
    localStorage.setItem("testid", testid);
    localStorage.setItem("testname", testname);
    localStorage.setItem("createdBy", createdBy);
  };

  if (loading)
    return (
      <>
        <Skeleton variant="rect" height={30} />
        <br />
        <Skeleton variant="rect" height={165} />
      </>
    );
  return (
    <>

    <div className="d-flex justify-content-between text-right">
      <Typography variant="h4" id="tableTitle" component="div">
      {props.toggle === 1 ? "": "Tests"}
      </Typography>
      <SubjectFilter getTests={props.getTests}/>
    </div>

      <TableContainer>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.header}>Name of the test</TableCell>
              <TableCell className={classes.header}>Subject</TableCell>
              <TableCell className={classes.header}>Duration(mins)</TableCell>
              <TableCell className={classes.header}>View Questions</TableCell>
              <TableCell className={classes.header}>View submission</TableCell>
              <TableCell className={classes.header}>Edit Test</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {tests.map(({ testname, testid, subname, subid, testtime, createdBy }) => (
              <TableRow key={testid}>
                <TableCell component="th" scope="row">
                  {testname}
                </TableCell>
                <TableCell component="th" scope="row">
                  {subname}
                </TableCell>
                <TableCell component="th" scope="row">
                  {testtime}
                </TableCell>
                <TableCell component="th" scope="row">
                  <Link to={{ pathname: "/add-questions" }}>
                    <button
                      type="button"
                      className="btn btn-info"
                      onClick={() => clickHandler(testid, testname, createdBy)}
                    >
                      Questions
                    </button>
                  </Link>
                </TableCell>
                <TableCell component="th" scope="row">
                  <Link to={{ pathname: "/results" }}>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => clickHandler(testid, testname, createdBy)}
                    >
                      Submissions
                    </button>
                  </Link>
                </TableCell>
                <TableCell component="th" scope="row">
                  <UpdateTest
                    initialTestName={testname}
                    initialSubid={subid}
                    initialTestTime={testtime}
                    testid={testid}
                    initialSubName={subname}
                    updateTest={props.updateTest}
                    createdBy={createdBy}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
