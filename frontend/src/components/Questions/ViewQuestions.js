import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useAuthState } from '../../context';
import { NavLoading } from "../Loading";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  }
}));

export default function ViewQuestions() {
  const [{loading}, dispatch] = useAuthState()

  const classes = useStyles();

  return (
    <div className={classes.root}>
    <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit">
            Questions
          </Typography>
        </Toolbar>
        {loading ? <NavLoading /> : <></>}
      </AppBar>
      <Grid container spacing={3}>
        <Grid item xs={12}>
        </Grid>
      </Grid>
    </div>
  );
}
