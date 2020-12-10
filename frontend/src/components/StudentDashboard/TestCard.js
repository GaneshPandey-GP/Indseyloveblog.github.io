import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { useAuthState, viewQuestions4Client } from "../../context";
import { Link } from "react-router-dom";
import { CardActions, Drawer } from "@material-ui/core";

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
  },
  main: {
    marginTop: 120,
  },
  data: {
    padding: theme.spacing(1),
    marginBottom: 8,
  },
}));

export const TestCard = () => {
  const [{ tests }] = useAuthState();
  try{
    var retrievedData = localStorage.getItem("testsGiven");
    var testsGiven = JSON.parse(retrievedData)
  }catch(err){
    console.log(err)
  }
  

  useEffect((testtime, testid, testname, totalMarks) => {
    handleTestClick(testtime, testid, testname, totalMarks)
  }, [tests]);

  const handleTestClick = (testtime, testid, testname, totalMarks) => {
    localStorage.setItem("timer", testtime)
    localStorage.setItem("testid", testid)
    localStorage.setItem("testname", testname)
    localStorage.setItem("totalMarks", totalMarks)
  }
  
  const handleSubmissionClick = (testid) => {
    localStorage.setItem("testid", testid)
  }
  const classes = useStyles();
  return (
    <>
      
      <div className={classes.main}>
      <hr />
        <div className="container">
          <div className="row mt-4">
            {tests[0] ? (
              <h2 className="col-sm-12 text-center card-header ">
                Tests
              </h2>
            ) : (
              <></>
            )}
            {tests.map(
              ({ testname, testid, subname, testtime, totalMarks }) => (
                <div className="col-sm-4 mb-4 mt-4 p-2" key={testid}>
                  <Card
                    className={classes.root}
                    variant="outlined"
                    key={testid}
                  >
                    <CardContent>
                      <h1 className={classes.title}>{testname}</h1>
                      <div className={classes.data}>
                        <Typography color="textSecondary">
                          Subject : {subname}
                        </Typography>
                        <Typography color="textSecondary">
                          Duration : {testtime} min
                        </Typography>
                      </div>
                    </CardContent>
                    <CardActions>
                    {testsGiven && testsGiven.find((value) => value === testid) ? 

                      (<Link to="/submission" className="btn btn-outline-info btn-lg btn-block">
                        <button
                          onClick={() =>
                            handleSubmissionClick(
                              testid,
                            )
                          }
                          className="btn "
                        >
                          View Submission
                        </button>
                      </Link>) :
                      (<Link to="/test" className="btn btn-outline-info btn-lg btn-block">
                        <button
                          onClick={() =>
                            handleTestClick(
                              testtime,
                              testid,
                              testname,
                              totalMarks
                            )
                          }
                          className="btn "
                        >
                          Start
                        </button>
                      </Link>)
                      }
                    </CardActions>
                  </Card>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
};
