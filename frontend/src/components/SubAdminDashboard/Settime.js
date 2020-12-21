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
  const today = new Date()
  const current = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() 

  return (
    <form className={classes.container} noValidate>
   
      <TextField
        id="datetime-local"
        label={props.label}
        type="datetime-local"
        defaultValue={`${current}T${time}`}
        className={classes.textField}
        onChange = {props.onChange}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  );
}
