import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { useAuthState, viewQuestions4Client, getTests } from "../../context";
import { Link } from "react-router-dom";
import { CardActions, Drawer } from "@material-ui/core";
import { Loading } from "../Loading";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 285,
    boxShadow: "7px 8px 10px #5a616f",
    "&:hover": {
      boxShadow: "7px 8px 10px #000000",
    },
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 26,
    textAlign: "center",
    padding: theme.spacing(1),
    fontWidth: 900,
    textTransform: "capitalize",
  },
  main: {
    marginTop: 120,
  },
  data: {
    marginBottom: 8,
    textAlign: "center",
  },
}));

export const TestCard = () => {
  const [{ tests, loading }] = useAuthState();
  try {
    var retrievedData = localStorage.getItem("testsGiven");
    var testsGiven = JSON.parse(retrievedData);
  } catch (err) {
    console.log(err);
  }

  useEffect(
    (testtime, testid, testname, totalMarks) => {
      handleTestClick(testtime, testid, testname, totalMarks);
    },
    [tests]
  );

  const handleTestClick = (
    testtime,
    testid,
    testname,
    totalMarks,
    startTestTime,
    endTestTime
  ) => {
    localStorage.setItem("timer", testtime);
    localStorage.setItem("testid", testid);
    localStorage.setItem("testname", testname);
    localStorage.setItem("totalMarks", totalMarks);
    localStorage.setItem("startTestTime", startTestTime);
    localStorage.setItem("endTestTime", endTestTime);
  };

  const handleSubmissionClick = (testid) => {
    localStorage.setItem("testid", testid);
  };
  const classes = useStyles();
  const today = new Date();
  const current = today.toLocaleString("en-US", { timeZone: "Asia/Kolkata" });

  return (
    <>
      <div className={classes.main}>
        <hr />
        {loading ? (
          <Loading />
        ) : (
          <div className="container">
            <div className="row mt-4">
              {tests.length === 0 ? (
                <h2 className="col-sm-12 text-center text-secondary border border-info p-3">
                  Tests Not Available!
                </h2>
              ) : (
                <h2 className="col-sm-12 text-center card-header text-secondary">
                  Tests
                </h2>
              )}
              {tests.map(
                ({
                  testname,
                  testid,
                  subname,
                  testtime,
                  totalMarks,
                  startTestTime,
                  endTestTime,
                  isActive,
                }) =>
                  isActive === 1 ? (
                    <div className="col-sm-4 mb-4 mt-4 p-2" key={testid}>
                      <Card
                        className={classes.root}
                        variant="outlined"
                        key={testid}
                      >
                        <CardContent>
                          <h1 className={classes.title}>{testname}</h1>
                          <div className={classes.data}>
                            <div className="mb-3 mt-2">
                              <Typography color="textSecondary" variant="body1">
                                <strong>Subject:</strong> {subname}
                              </Typography>
                              <Typography color="textSecondary" variant="body1">
                                <strong>Dur:</strong> {testtime} (mins)
                              </Typography>
                            </div>
                            <Typography
                              color="textSecondary"
                              variant="subtitle1"
                            >
                              <strong>Starts At:</strong> {startTestTime}
                            </Typography>
                            <Typography
                              color="textSecondary"
                              variant="subtitle1"
                            >
                              <strong>Ends At:</strong> {endTestTime}
                            </Typography>
                          </div>
                        </CardContent>
                        <CardActions>
                          {testsGiven &&
                          testsGiven.find((value) => value === testid) ? (
                            <>
                              {new Date(current) >= new Date(endTestTime) ? (
                                <Link
                                  to="/submission"
                                  className="btn btn-outline-info btn-lg btn-block"
                                >
                                  <button
                                    onClick={() =>
                                      handleSubmissionClick(testid)
                                    }
                                    className="btn "
                                  >
                                    View Submission
                                  </button>
                                </Link>
                              ) : (
                                <Link
                                  to="/subject-test-view"
                                  className="btn btn-outline-info btn-lg btn-block"
                                >
                                  <button className="btn ">OnGoing</button>
                                </Link>
                              )}
                            </>
                          ) : (
                            <>
                              {new Date(current) <= new Date(startTestTime) ||
                              new Date(current) >= new Date(endTestTime) ? (
                                <Link
                                  to="/subject-test-view"
                                  className="btn btn-outline-info btn-lg btn-block"
                                >
                                  {new Date(current) <=
                                  new Date(startTestTime) ? (
                                    <button className="btn ">Upcoming</button>
                                  ) : (
                                    <button className="btn ">Expired</button>
                                  )}
                                </Link>
                              ) : (
                                <Link
                                  to="/test"
                                  className="btn btn-outline-info btn-lg btn-block"
                                >
                                  <button
                                    onClick={() =>
                                      handleTestClick(
                                        testtime,
                                        testid,
                                        testname,
                                        totalMarks,
                                        startTestTime,
                                        endTestTime
                                      )
                                    }
                                    className="btn "
                                  >
                                    Start
                                  </button>
                                </Link>
                              )}
                            </>
                          )}
                        </CardActions>
                      </Card>
                    </div>
                  ) : (
                    <span key={testid}></span>
                  )
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
