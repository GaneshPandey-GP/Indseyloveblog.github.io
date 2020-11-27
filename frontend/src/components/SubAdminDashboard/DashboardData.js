import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Paper, Grid, Divider } from "@material-ui/core";
import LDrawer from "./LDrawer";
import { useAuthState } from "../../context";
import Loading from "../Loading";
import ViewTests from './ViewTests'

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

  const [{loading}, dispatch] = useAuthState()
  if (loading)
    return(
      <Loading />
  )  
  return (
    <div className={classes.root}>
      <LDrawer />
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: false,
        })}
      >
        <div className={classes.drawerHeader} />
        <Grid container spacing={3} className="mt-3">
          <Grid item xs={12} sm={12} md={6}>
            <Paper className={classes.paper}>
              <ViewTests />
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
