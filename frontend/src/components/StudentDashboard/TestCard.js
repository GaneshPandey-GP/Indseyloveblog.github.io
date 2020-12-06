import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useAuthState, viewQuestions4Client } from "../../context";
import { Link } from "react-router-dom";

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
    fontSize: 24,
    padding: theme.spacing(1),
    fontWidth: 900,
  },
  main: {
    marginTop: 150,
  },
  data: {
    padding: theme.spacing(1),
    marginBottom: 12,
  },
}))


export const TestCard = () => {
  const [{ tests }, dispatch] = useAuthState()
  const handleTestClick = (testid, testtime) => {
    viewQuestions4Client(dispatch, testid )
    localStorage.setItem("timer", testtime)
  }
  const classes = useStyles();
  return (
    <>
      <div className={classes.main}>
        <div className="container mt-5">
          <div className="row mt-5">
            {tests[0] ? <h1 className="col-sm-12 text-capitalize text-center card-header">
              Tests
            </h1> : <></>}
            {tests.map(({ testname, testid, subname, testtime }) => (
              <div className="col-sm-4 mb-4 mt-3" key={testid}>
                <Card className={classes.root} variant="outlined" key={testid}>
                  <CardContent>
                    <Typography
                      className={classes.title}
                      variant="h5"
                      component="h4"
                      gutterBottom
                    >
                      Test Name : {testname}
                    </Typography>
                    <Typography color="textSecondary" className={classes.data}>
                      Subject : {subname}
                    </Typography>
                    <Typography color="textSecondary" className={classes.data}>
                      Ends On : {testtime} min
                    </Typography>
                  </CardContent>
                  {/* <CardActions> */}
                    <Link to="/test">
                      <button onClick={() => handleTestClick(testid, testtime)}
                        className="btn btn-info btn-lg btn-block"
                      >
                        Start
                      </button>
                    </Link>
                  {/* </CardActions> */}
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
