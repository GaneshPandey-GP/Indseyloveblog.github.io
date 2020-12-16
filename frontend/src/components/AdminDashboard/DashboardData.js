import React, { useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Grid } from "@material-ui/core";
import LDrawer from "./LDrawer";
import ViewTests from '../SubAdminDashboard/ViewTests'
import { getSubjects4Admin, getTests4Admin, readUser4Admin, useAuthState } from "../../context";

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
    background:"#ffff",
    boxShadow: "2px 3px 10px #3f51b5",
    
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
    const [{tests, users}, dispatch] = useAuthState()
    useEffect(() => {
        getTests4Admin(dispatch)
        readUser4Admin(dispatch)
        getSubjects4Admin(dispatch)
    },[])
  const classes = useStyles();
    console.log(users)

    const admins = []
    const subAdmins = []
    const clients = []


    for (let i in users){
      users[i].level === 1 ? subAdmins.push(users[i]) : 
      users[i].level === 2 ? clients.push(users[i]) : 
       admins.push(users[i])
    };

  return (
    <div className={classes.root}>
      <LDrawer admins={admins} subAdmins={subAdmins} clients={clients}/>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: false,
        })}
      >
        <div className={classes.drawerHeader} />
        <Grid container spacing={3} className="mt-3">
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <ViewTests />
            </Paper>
          </Grid>
          
        </Grid>
      </main>
    </div>
  );
}
