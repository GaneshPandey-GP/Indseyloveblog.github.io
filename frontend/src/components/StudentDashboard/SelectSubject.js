import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { useAuthState, getTests4Client } from "../../context";
import Nav from "./Nav";
import { TestCard } from "./TestCard";
import History from "../History";
import { Redirect } from "react-router-dom";
import Skeleton from "@material-ui/lab/Skeleton";
import { Loading } from "../Loading";

const useStyles = makeStyles((theme) => ({
  head: {
    color: "#3f51b5",
    fontFamily: "'Times New Roman', Times, serif",
    fontWeight: 600,
  },
  bodyCard: {
    display: "flex",
    marginTop: 3,
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0),
      width: theme.spacing(46),
      height: theme.spacing(10),
    },
  },
  main: {
    flexGrow: 1,
    marginTop: 80,
  },
  paper: {
    padding: theme.spacing(4),
    fontWeight: 700,
    whiteSpace: "nowrap",
    background: "#fff",
    borderBottom: "1px solid #fff",
    fontSize: 15,
    color: theme.palette.text.secondary,
    "&:hover": {
      boxShadow: "7px 8px 10px #3f51b5",
      color: "#3f51b5",
      cursor: "pointer",
    },

    "&:active": {
      color: "#acb1c5",
      backgroundColor: "#b8daff",
    },
  },
}));

function SelectSubject() {
  const classes = useStyles();
  const [show, setShow] = useState(false);
  const [{ subjects, loading }, dispatch] = useAuthState();
  const [error, setError] = useState(false);
  const category = localStorage.getItem("category");
  const categoryid = localStorage.getItem("categoryid");
  const [load, setLoad] = useState(true);

  useEffect(() => {
    try {
      localStorage.removeItem("testid");
      localStorage.removeItem("testtime");
      localStorage.removeItem("testname");
      localStorage.removeItem("totalMarks");
      localStorage.removeItem("timer");
    } catch (err) {
      console.log(err);
    }
    if (categoryid === null || category === null) setError(true);
  }, [categoryid, category]);

  const handleClick = (subid) => {
    getTests4Client(dispatch, subid);
    setLoad(false);
    setShow(true);
  };

  if (error) return <Redirect to="/stud-dashboard" />;

  return (
    <>
      <Nav />
      {loading && load ? (
        <div className="container">
          <div className="row mb-5">
            <div className="col-sm-12 mb-5">
              <Skeleton variant="rect" height={50} />
            </div>
            <br />
            <div className="col-sm-4 mb-5">
              <Skeleton variant="rect" height={65} />
            </div>
            <br />
            <div className="col-sm-4 mb-5">
              <Skeleton variant="rect" height={65} />
            </div>
            <br />
            <div className="col-sm-4 mb-5">
              <Skeleton variant="rect" height={65} />
            </div>
            <br />
          </div>
        </div>
      ) : (
        <div>
          <div className={classes.main}>
            <div className="container">
              <History history={category} />
              {loading && load ? (
                <Loading />
              ) : (
                <div className={classes.bodyCard}>
                  {subjects.length === 0 ? (
                    <h3 className="mt-4 p-3 text-secondary border border-info">
                      No subjects available!
                    </h3>
                  ) : (
                    <>
                      {subjects.map(({ subname, subid }) => (
                        <Grid container spacing={3} key={subid}>
                          <Grid item xs={12}>
                            <Paper
                              className={classes.paper}
                              onClick={() => handleClick(subid)}
                            >
                              {subname}
                            </Paper>
                          </Grid>
                        </Grid>
                      ))}
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
          {show ? (
            loading ? (
              <div className="mt-5 pt-5">
                <hr />
                <Loading />
              </div>
            ) : (
              <TestCard />
            )
          ) : (
            <></>
          )}
        </div>
      )}
    </>
  );
}

export default SelectSubject;
