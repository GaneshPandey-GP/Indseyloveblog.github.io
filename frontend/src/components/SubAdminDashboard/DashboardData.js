import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button, Paper, Grid } from "@material-ui/core";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateSub from "./CreateSub";
import LDrawer from "./LDrawer";

import ViewSubjects from "./ViewSubjects";
import { useAuthState } from "../../context";
import Loading from "../Loading";
import TestForm from "./CreateTest";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },

  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function DashboardData() {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [dialog, setDialog] = React.useState(false);
  const [{loading}, dispatch] = useAuthState()

  const handleClickOpen = () => {
    setDialog(true);
  };
  console.log(loading)
  if (loading)
    return(
      <Loading />
  )  
  return (
    <div className={classes.root}>
      <LDrawer />
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <Grid container spacing={3} className="mt-3">
          <Grid item xs={12} sm={12} md={6}>
            <Paper className={classes.paper}>
            <Typography
                className={classes.title}
                color="textPrimary"
                gutterBottom
              >
                Tests
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Paper className={classes.paper}>
              <Typography
                className={classes.title}
                color="textPrimary"
                gutterBottom
              >
                Submissions
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </main>
    </div>
  );
}