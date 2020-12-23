import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import { deleteLink, updateLink, useAuthState } from '../../context';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { AccordionActions, Button, Divider, TextField } from '@material-ui/core';
import DeleteItem from './DeleteItem';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

export default function UpdateLink({ilink, linkid, ilinktitle}) {
  const [link, setLink] = useState(ilink)
  const [{}, dispatch] = useAuthState()

  const [linktitle, setLinkTitle] = useState(ilinktitle)
  const [valueError, setValueError] = React.useState('')

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (link === '' || linktitle === '')
      setValueError("Enter the values!")
    else
      updateLink(dispatch, linkid, link, linktitle);
  }
  return (
    <div className={classes.root}>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<EditOutlinedIcon className="text-success"/>}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>{ilinktitle}</Typography>
          <Typography className={classes.secondaryHeading}>{ilink}</Typography>
        </AccordionSummary>
        <DeleteItem deleteFun={() => deleteLink(dispatch, linkid)} item={ilink}/>
        <AccordionDetails>
        <TextField label="link title" value={linktitle} onChange={(e) => setLinkTitle(e.target.value)}/>
        <AccordionDetails>
        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" value={link} onChange={(e) => setLink(e.target.value)}/>
        </AccordionDetails>
        </AccordionDetails>
        <AccordionActions>
          {valueError ? <p className="text-small text-danger ml-4">{valueError}</p>: <p></p>}

          <Button size="small" color="primary" type="submit" onClick={handleSubmit}>
            Save
          </Button>
        </AccordionActions>
        <Divider />
      </Accordion>
    </div>
  );
}
