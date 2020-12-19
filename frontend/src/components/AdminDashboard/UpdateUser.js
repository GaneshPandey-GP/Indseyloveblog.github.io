import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useAuthState } from '../../context';
import { updateAdminSiteUser } from '../../context';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

import Alert from "@material-ui/lab/Alert";
import { Loading } from "../Loading";
import { useForm } from "react-hook-form";
import { Divider, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    minwidth: 100,
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
}));

export default function UpdateTest({ifname, ilname, icontact, iemail, itestsGiven, iuid}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [fname, setFname] = useState(ifname)
  const [lname, setLname] = useState(ilname)
  
  const [email, setEmail] = useState(iemail)
  const [contact, setContact] = useState(icontact)

  const [valueError, setValueError] = React.useState()

  
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if ( fname === '' || lname === '' || email === '' || contact === '' ) 
      setValueError("Enter all the values!")
      else {
        setValueError("")
        updateAdminSiteUser(dispatch, fname, lname, contact, email, iuid )
      }
    if (valueError === '')
      handleClose()    
  };


  const [formError, setFormError] = useState("");
  const { register, handleSubmit, errors } = useForm();
 
  const [{loading }, dispatch] = useAuthState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
    
      <EditOutlinedIcon onClick={handleClickOpen} style={{cursor: 'pointer'}}/>
      <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
        <form className={classes.container} id="update-user-form"  noValidate autoComplete="off">
        <DialogTitle>Update Details of {fname} {lname}</DialogTitle>
        <Divider />
          <DialogContent>
          <form
          onSubmit={handleFormSubmit}
          autoComplete="off"
          className="col mt-3 p-2"
        >
          <div className="form-group">
          <Typography color="textSecondary" variant="body2">First Name</Typography>
            <input
              onChange={(e) => setFname(e.target.value)}
              required
              type="text"
              name="fname"
              className="form-control"
              aria-describedby="Enter First name"
              placeholder=" First name"
              value = {fname}
              ref={register({
                required: {
                  value: true,
                  message: "Please enter your First Name",
                },
              })}
            />
            {errors.fname && (
              <Alert
                severity="warning"
                className="errorMessage mandatory text-error"
              >
                {errors.fname.message}
              </Alert>
            )}
          </div>
          <div className="form-group">
          <Typography color="textSecondary" variant="body2">Last Name</Typography>

            <input
              onChange={(e) => setLname(e.target.value)}
              required
              type="text"
              name="lname"
              className="form-control"
              aria-describedby="Enter last name"
              placeholder=" last name"
              value={lname}
              ref={register({
                required: {
                  value: true,
                  message: "Please enter your Last Name",
                },
              })}
            />
            {errors.lname && (
              <Alert severity="warning" className="errorMessage">
                {errors.lname.message}
              </Alert>
            )}
          </div>
          <div className="form-group">
          <Typography color="textSecondary" variant="body2">Contact</Typography>

            <input
              required
              onChange={(e) => setContact(e.target.value)}
              type="tel"
              name="contact"
              className="form-control"
              aria-describedby="Enter Phone no"
              value = {contact}
              placeholder="Phone no"
              ref={register({
                required: {
                  value: true,
                  message: "Please enter your Phone no",
                },
                pattern: {
                  value: /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/i,
                  message: "Enter a valid Phone Number",
                },
              })}
            />
            {errors.contact && (
              <Alert severity="warning" className="errorMessage">
                {errors.contact.message}
              </Alert>
            )}
          </div>
          <div className="form-group">
          <Typography color="textSecondary" variant="body2">Email</Typography>

            <input
              required
              onChange={(e) => setEmail(e.target.value)}
              id="inputForEmail"
              type="email"
              name="email"
              className="form-control"
              aria-describedby="Enter email address"
              value={email}
              placeholder="Enter email address"
              ref={register({
                required: {
                  value: true,
                  message: "Please enter your email address",
                },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Enter a valid email address",
                },
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters are allowed",
                },
                maxLength: {
                  value: 255,
                  message: "Maximum 255 characters are allowed",
                },
              })}
            />
            {errors.email && (
              <Alert severity="warning" className="errorMessage mandatory">
                {errors.email.message}
              </Alert>
            )}
          </div>
          
    
          {formError !== "" ? (
            <p style={{ color: "red" }}>{formError}</p>
          ) : (
            <p></p>
          )}{" "}
          <button type="submit" className="btn btn-primary col-sm-12 btns" onClick={handleFormSubmit}>
            {loading ? <Loading /> : "Update"}
          </button>
        </form>
          </DialogContent>
          </form>
          {valueError ? <p className="text-small text-danger ml-4">{valueError}</p>: <p></p>}
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleFormSubmit} color="primary" form="test-form">
              Ok
            </Button>
          </DialogActions>

      </Dialog>
     
    </div>
  );
}
