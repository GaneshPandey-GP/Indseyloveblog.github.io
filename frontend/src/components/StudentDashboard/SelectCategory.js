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
import { Link } from 'react-router-dom';
import Grid from "@material-ui/core/Grid";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import { useAuthState } from "../../context";
import { NavLoading } from "../../components/Loading";
import Button from '@material-ui/core/Button';

import Chip from '@material-ui/core/Chip';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    overflowX: "hidden",
    marginBottom: 64,
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
    marginTop: 100,
  },
  paper: {
    padding: theme.spacing(4),
    margin: theme.spacing(1),
    fontWeight: 800,
    width:"100%",
    margin:'dense',
    border: "none",
    borderBottom: "1px solid #fff",
    fontSize: 22,
    color: theme.palette.text.secondary,
    "&:hover": {
      boxShadow: "7px 8px 10px #3f51b5",
    },
  },
  wrapper: {
    borderRadius: "6px",
  },
  typography: {
    height: "26px",
    fontSize: 20,
    fontWeight: 900,
  },
  appBar: {
    background: "#3f51b5",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
}));
const Change = () =>{
 alert("Hello")
}
function SelectCategory() {
  const classes = useStyles();
  const [{ isAuthenticated, loading, categories }, dispatch] = useAuthState();

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
      {loading ? (
        <NavLoading />
      ) : (
        <div className={classes.main}>
          <div className="container">
            <h1 className="text-capitalize text-center card-header ">
              Category
            </h1>
            <div className={classes.bodyCard}>
              {categories.map(({ categoryName,categoryid },index) => (
                <Grid container spacing={4}>
                  <Grid item xs={12}> 
                  <Link  to={{pathname: "/stu-view" }}  > <Chip label={categoryName} className={classes.paper} onClick={()=>dispatch({type:"SET_CATEGORY_ID",categoryid})}  icon={ <LibraryBooksIcon /> } component="button" /> </Link>
                  </Grid>
                </Grid>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SelectCategory;
