import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import { useHistory  } from 'react-router-dom';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
const useStyles = makeStyles((theme) => ({
  container: {
    height: "2.6rem",
  },
  link: {
    display: 'flex',
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
  back: {
    marginLeft: theme.spacing(1.5),
    width: 35,
    height: 35,
    cursor: 'pointer',

    "&:hover": {
      width: 43,
      height: 43,
    }
  }
}));


export default function History({history}) {
  const classes = useStyles();
  const back = useHistory ();

  const handleClick = () => {
    back.goBack()
  }
  return (
    <div className={classes.container}>
     {history !== "" ?
      <>
    <Breadcrumbs aria-label="Subject">

      <Typography color="textPrimary" className={classes.link}>
        <MenuBookIcon className={classes.icon} />
        {history} / 
      </Typography>
    </Breadcrumbs>
    <KeyboardBackspaceIcon className={classes.back} onClick={handleClick}/>
    </>
    : 
    <KeyboardBackspaceIcon className={classes.back} onClick={handleClick}/>
      }
    </div>
  );
}
