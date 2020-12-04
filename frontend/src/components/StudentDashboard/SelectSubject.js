import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountBalanceRoundedIcon from "@material-ui/icons/AccountBalanceRounded";
import clsx from "clsx";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import { useAuthState } from "../../context";
import { NavLoading } from "../../components/Loading";
import Nav from "./Nav";
import { TestCard } from "./TestCard";
import { getTests } from "../../context/actions";
const useStyles = makeStyles((theme) => ({

  head: {
    color: "#3f51b5",
    fontFamily: "'Times New Roman', Times, serif",
    fontWeight: 600,
  },
  bodyCard: {
    display: "flex",
    marginTop: 0,
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
    background: "transparent",
    borderBottom: "1px solid #fff",
    fontSize: 15,
    color: theme.palette.text.secondary,
    "&:hover": {
      boxShadow: "7px 8px 10px #3f51b5",
      cursor: 'pointer'
    },
  },
}));

function SelectSubject() {
  const classes = useStyles()
  const [show, setShow] = useState(false)
  const [{ subjects, loading }, dispatch] = useAuthState();
  const handleClick = (subid) => {
    getTests(dispatch, subid)
    setShow(true)
  }
  return (
    <>
      <Nav />
        <div className={classes.main}>
          <div className="container">
          <h4 className="">
              Select a Subject
            </h4>
            <div className={classes.bodyCard}>
              {subjects.map(({ subname, subid }) => (
                <Grid container spacing={3}>
                  <Grid item xs={12}  >
                    <Paper className={classes.paper} onClick={() => handleClick(subid)}>
                      {subname}
                    </Paper>
                  </Grid>
                </Grid>
              ))}
            </div>
          </div>
        </div>
        {show && loading === false ? <TestCard /> : <></>}
    </>
  );
}

export default SelectSubject;
