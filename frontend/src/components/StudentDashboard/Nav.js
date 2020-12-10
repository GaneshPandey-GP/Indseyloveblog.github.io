import React from "react";
import { Link, NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountBalanceRoundedIcon from "@material-ui/icons/AccountBalanceRounded";
import clsx from "clsx";
import { useAuthState } from "../../context";
import { NavLoading } from "../Loading";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    overflowX: "hidden",
    marginBottom: 100,
  },
  head: {
    color: "#3f51b5",
    fontFamily: "'Times New Roman', Times, serif",
    fontWeight: 600,
  },
  home: {
    fontSize: 15,
    fontWeight: 50,
    color: "#ffff",
  },
 
  link: {
    fontSize: 15,
    fontWeight: 50,
    textDecorationLine:"none !important",
    color: "#ffff",
    "&:hover": {
      color: "#ffff",
      textDecoration:"none",
    },
  },
  title: {
    flexGrow: 1,
    fontSize: 16,
    fontWeight: 700,
  },

  appBar: {
    background: "#3f51b5",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
}));

function Nav() {
  const classes = useStyles();
  const [{ loading, categories }, dispatch] = useAuthState();
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
             <Link className={classes.link} to=".">
                Home
              </Link>
            </IconButton>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              className={classes.home}
            >
              <Link className={classes.link} to="/results">
                Results
              </Link>
            </IconButton>
            {/* <IconButton
              color="inherit"
              aria-label="open drawer"
              className={classes.home}
            >
              <Link className={classes.link} style={{textDecoration:"none"}} to="">
                Profile
              </Link>
            </IconButton> */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              className={classes.home}
            >
              <ExitToAppIcon />
              <Link t0="/login" >Logout</Link>
            </IconButton>
          </Toolbar>
          {loading ? <NavLoading /> : <></>}
        </AppBar>
      </div>
    </>
  );
}

export default Nav;
