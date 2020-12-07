import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Backdrop from '@material-ui/core/Backdrop';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(3),
    },
  },
  loading: {
    display: "flex",
    justifyContent: "center",
    left: "50%",
    textAlign: "center",
    alignSelf: "center",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export const NavLoading = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <LinearProgress />
      {/* <LinearProgress color="secondary" /> */}
    </div>
  );
};

export const Loading = () => {
  return (
  <div className="text-center">
    <div className="spinner-border" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
  )
};


export const SimpleBackdrop = () => {
  const classes = useStyles();

  return (
    <div>
      <Backdrop className={classes.backdrop} open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}