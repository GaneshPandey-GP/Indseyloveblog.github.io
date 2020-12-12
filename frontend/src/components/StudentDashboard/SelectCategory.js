import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { useAuthState } from "../../context";
import Paper from "@material-ui/core/Paper";
import Nav from "./Nav";
import LinkCarousel from "./LinkCarousel";
import { yellow } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
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
    padding: theme.spacing(2),
    margin: theme.spacing(1),
    fontWeight: 800,
    width: "100%",
    margin: "dense",
    border: "none",
    borderBottom: "1px solid #fff",
    fontSize: 22,
    color: theme.palette.text.secondary,
    "&:hover": {
      boxShadow: "7px 8px 10px #3f51b5",color:"#3f51b5",
    },
    "&:active": {
      backgroundColor: "#b8daff",
    },
  },
}));

function SelectCategory() {
  const classes = useStyles();
  const [{ loading, categories }] = useAuthState();

  const clickHandler = (categoryid, category) => {
    localStorage.setItem("categoryid", categoryid)
    localStorage.setItem("category", category)
  }
  return (
    <>
    <Nav />
      {loading ? (
        <div></div>
      ) : (
        <div className={classes.main}>
          <div className="container">
          <LinkCarousel />
            <h4>Select a Category</h4>
            <div className={classes.bodyCard}>
              {categories.map(({ categoryName, categoryid }, index) => (
                <Grid container spacing={4} key={categoryid}>
                  <Grid item xs={12}>
                    <Link to={{ pathname: "/subject-test-view" }}>
                      <Paper
                        label={categoryName}
                        
                        className={classes.paper}
                        onClick={() => clickHandler(categoryid, categoryName)}
                        component="button">{categoryName}
                        </Paper>
                    </Link>
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
