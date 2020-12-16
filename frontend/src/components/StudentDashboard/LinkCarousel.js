import { Typography } from "@material-ui/core";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { useAuthState } from "../../context";
import Paper from "@material-ui/core/Paper";

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
    fontSize: 20,
    color: theme.palette.text.secondary,
    "&:hover": {
      boxShadow: "7px 8px 10px #3f51b5",
      color: "#3f51b5",
    },
    "&:active": {
      backgroundColor: "#b8daff",
    },
  },
}));

function LinkCarousel() {
  const classes = useStyles();
  const [index, setIndex] = useState(0);
  const [{ links }] = useAuthState();
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  return (
    <>
      <div className={classes.bodyCard}>
        {links.map(({ link, linktitle, linkid }) => (
          <Grid container spacing={4} key={linkid}>
            <Grid item xs={12}>
              <Paper
                label={linktitle}
                className={classes.paper}
                component="button"
              >
                {linktitle}
                <br />
                <a href={link} target="_blank">
                  {link}
                </a>
              </Paper>
            </Grid>
          </Grid>
        ))}
      </div>
    </>
  );
}

export default LinkCarousel;
