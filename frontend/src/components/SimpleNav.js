import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { NavLoading } from './Loading';
import { useAuthState } from '../context';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function SimpleNav({heading}) {
  const classes = useStyles();
  const [{ loading }] = useAuthState();


  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6">
            {heading}
          </Typography>
        </Toolbar>
        {loading ? <NavLoading /> : <></>}
      </AppBar>
    </div>
  );
}
