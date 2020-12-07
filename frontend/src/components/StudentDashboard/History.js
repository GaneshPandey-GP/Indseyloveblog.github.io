import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import MenuBookIcon from '@material-ui/icons/MenuBook';

const useStyles = makeStyles((theme) => ({
  link: {
    display: 'flex',
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
}));


export default function History() {
  const category = localStorage.getItem("category")
  const classes = useStyles();

  return (
    <Breadcrumbs aria-label="Subject">
      <Typography color="textPrimary" className={classes.link}>
        <MenuBookIcon className={classes.icon} />
        {category} /
      </Typography>
    </Breadcrumbs>
  );
}
