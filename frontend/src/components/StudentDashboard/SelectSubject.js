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
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import { useAuthState } from "../../context";

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
      margin: theme.spacing(0),
      width: theme.spacing(46),
      height: theme.spacing(10),
    },
  },
  main: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(4),
    // textAlign: "left",
    fontWeight: 900,
    background: "transparent",
    borderBottom: "1px solid #fff",

    color: theme.palette.text.secondary,
    "&:hover": {
      boxShadow: "7px 8px 10px #3f51b5",
    },
  },
  wrapper: {
    borderRadius: "6px",
  },
  appBar: {
    background: "#3f51b5",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
}));

function SelectSubject() {
  const classes = useStyles();
  const [{ isAuthenticated, loading, subjects }, dispatch] = useAuthState();
  const subject =["Daa","CN","DS","DAA","OS","DBMS","Daa","CN","DS"] 
 
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
      <div className="container mt-5 ">
        <div className="card-text ">
          <h3>Subjects</h3>
        </div>
        <div className={classes.bodyCard}>
        {subject.map(({subname})=>  
       (  <Grid container spacing={3}>
        
            <Grid item xs={12}>
              
            <Paper className={classes.paper}>
               <Grid container spacing={3}>
                  
                    <Grid item xs={12} style={{"height":10,}}>
                        <Typography>
                            <LibraryBooksIcon/>{subname}
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
            </Grid>
        </Grid>))}
        </div>
      </div>
    </>
  );
}

export default SelectSubject;
