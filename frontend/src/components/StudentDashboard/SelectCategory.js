import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from 'react-router-dom';
import Grid from "@material-ui/core/Grid";
import { useAuthState } from "../../context";
import Chip from '@material-ui/core/Chip';
import Nav from "./Nav";

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
      <Nav />
        <div className={classes.main}>
          <div className="container">
            <h4 className="">
              Select a Category
            </h4>
            <div className={classes.bodyCard}>
              {categories.map(({ categoryName, categoryid },index) => (
                <Grid container spacing={4} key={categoryid}>
                  <Grid item xs={12}> 
                  <Link  to={{pathname: "/subject-test-view" }}  > <Chip label={categoryName} className={classes.paper} onClick={() => localStorage.setItem("categoryid", categoryid)}  component="button" /> </Link>
                  </Grid>
                </Grid>
              ))}
            </div>
          </div>
        </div>
    </>
  );
}

export default SelectCategory;
