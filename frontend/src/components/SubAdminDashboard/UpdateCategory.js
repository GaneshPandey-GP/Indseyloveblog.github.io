import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { AccordionActions, Button, Divider, TextField } from '@material-ui/core';
import { useAuthState, updateCategory, deleteCategory } from '../../context';
import DeleteItem from './DeleteItem';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  delete: {
    color: 'red',
    fontSize: "2rem",
    marginRight: "1rem",
    cursor: 'pointer',
    float: 'right',
  }
}));

export default function UpdateCategory({categoryid, categoryName}) {
  const [category, setCategory] = useState(categoryName);
  const [{}, dispatch] = useAuthState()
  const [valueError, setValueError] = React.useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    if (category === '')
      setValueError("Enter the Category!")
    else
      {setValueError("")
      updateCategory(dispatch, categoryid, categoryName=category);
      setForm(category)}
  }

  const setForm = (category) => {
    setCategory(category)
  }
  const classes = useStyles();
  return (
    <form className={classes.root} onSubmit={handleSubmit} noValidate autoComplete="off">
      <Accordion square >
        <AccordionSummary
          expandIcon={<EditOutlinedIcon className="text-success"/>}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>{categoryName}</Typography>
        </AccordionSummary>
        <DeleteItem deleteFun={() => deleteCategory(dispatch, categoryid)} item={categoryName}/>

        <AccordionDetails>
        <TextField id={categoryName} label="Update Category" value={category} onChange={(e) => setCategory(e.target.value)}/>
        </AccordionDetails>
        <AccordionActions>
          {valueError ? <p className="text-small text-danger ml-4">{valueError}</p> : <p></p>}
          <Button size="small" color="primary" type="submit" onClick={handleSubmit}>
            Save
          </Button>
        </AccordionActions>
        <Divider />
      </Accordion>
    </form>
  );
}
