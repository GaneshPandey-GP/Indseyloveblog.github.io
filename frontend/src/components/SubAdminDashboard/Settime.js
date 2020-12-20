import React  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function Settime(props) {
  const classes = useStyles();
 
  return (
    <form className={classes.container} noValidate>
   
      <TextField
        id="datetime-local"
        label={props.label}
        type="datetime-local"
        defaultValue="2017-05-24T10:30"
        className={classes.textField}
        onChange = {props.onChange}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  );
}
