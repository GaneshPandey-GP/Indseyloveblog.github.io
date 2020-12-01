import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountBalanceRoundedIcon from "@material-ui/icons/AccountBalanceRounded";
import clsx from "clsx";
import ActiveTest from "../components/StudentDashboard/Activetest";
import PastsTest from "../components/StudentDashboard/PastsTest";
import UpcommingTest from "../components/StudentDashboard/UpcommingTest";
import {TestCard} from '../components/StudentDashboard/TestCard';
import { useAuthState } from "../context";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    overflowX: "hidden",
    marginBottom: 100,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  head: {
    color: "#3f51b5",
    fontFamily: "'Times New Roman', Times, serif",
    fontWeight: 600,
  },
  home: {
    fontSize: 15,
    fontWeight: 50,
  },
  title: {
    flexGrow: 1,
    fontSize: 16,
    fontWeight: 700,
  },
  bodyCard: {
    display: "flex",
   
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.1),
      width: theme.spacing(46),
      height: theme.spacing(40),
    },
  },
  main: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    fontWeight: 900,
    background:"transparent",
    borderBottom:"1px solid #fff",

    color: theme.palette.text.secondary,
    "&:hover": {
      boxShadow: "7px 8px 10px #3f51b5",
    },
  },
wrapper:{
  borderRadius:"6px",
},
  appBar: {
    background: "#3f51b5",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
}));

export default function StudentDashboard() {
  const classes = useStyles();
  const [{ isAuthenticated, loading, user }, dispatch] = useAuthState();
  console.log(user);

  return (
    <>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={clsx(classes.appBar)}>
          <Toolbar>
            <Typography variant="h6" noWrap className={classes.title}>
              <AccountBalanceRoundedIcon /> SCE Exam Portal
            </Typography>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              className={classes.home}
            >
              Home
            </IconButton>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              className={classes.home}
            >
              Tests
            </IconButton>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              className={classes.home}
            >
              Profile
            </IconButton>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              className={classes.home}
            >
              <ExitToAppIcon />
              Logout
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
      {/* <div className="container mt-5 ">
        <div className="row">
          <div className="col-sm-12">
            <h2 className="card-header card-title text-center text-uppercase">
              <span className={classes.head}>Tests</span>
            </h2>
          </div>
          <div className="col-sm-7 mt-4">
            <h3 className="card-header card-title">Active Test</h3>
            <ActiveTest />
          </div>
          <div className="col-sm-5 mt-4">
            <h3 className="card-header card-title">Past Tests</h3>
            <PastsTest />
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-sm-8">
          <h3 className="card-header card-title">Upcomming Test</h3>
            <UpcommingTest />
          </div>
        </div>
      </div> */}
      <div className="container mt-5 ">
        <div className="card-text ">
          <h3>Subjects</h3>
        </div>
        <div className={classes.bodyCard}>
          <Paper elevation={3} className={classes.wrapper}>
            <Grid container spacing={3}>
              <Grid item xs={12} >
                <Typography className={classes.paper}> <LibraryBooksIcon/> Algorithms</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography className={classes.paper}> <LibraryBooksIcon/> Computer Network</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography className={classes.paper}> <LibraryBooksIcon/> Data Structure</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography className={classes.paper}> <LibraryBooksIcon/> Python</Typography>
              </Grid>
            </Grid>
          </Paper>
          <Paper elevation={3} className={classes.wrapper}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography className={classes.paper}> <LibraryBooksIcon/> Data Structure</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography className={classes.paper}> <LibraryBooksIcon/> Computer Network</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography className={classes.paper}> <LibraryBooksIcon/> Algorithms </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography className={classes.paper}> <LibraryBooksIcon/> Python</Typography>
              </Grid>
            </Grid>
          </Paper>
          <Paper elevation={3} className={classes.wrapper}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
          <Typography className={classes.paper}><LibraryBooksIcon/>  Python</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography className={classes.paper}> <LibraryBooksIcon/> Computer Network</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography className={classes.paper}> <LibraryBooksIcon/> Data Structure</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography className={classes.paper}> <LibraryBooksIcon/> Algorithms</Typography>
              </Grid>
            </Grid>
          </Paper>
        </div>
       <div className="row mt-5 display-1">
       <h1 className="col-sm-12 text-capitalize text-center card-header">Tests</h1>
       <TestCard/>
       <TestCard/>

       </div>
        
      </div>
    </>
  );
}
