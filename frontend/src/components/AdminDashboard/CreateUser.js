import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { useAuthState } from "../../context";
import EditIcon from "@material-ui/icons/Edit";
import { useForm } from "react-hook-form";
import Alert from "@material-ui/lab/Alert";
import { Loading } from "../Loading";

export default function CreateUser({ heading, registerUser }) {
  const [open, setOpen] = React.useState(false);
  const [formError, setFormError] = useState("");
  const { register, handleSubmit, errors } = useForm();
  const [{ loading }, dispatch] = useAuthState();

  const onSubmit = (data, e) => {
    console.log(data);
    setFormError("");
    e.preventDefault();
    data.password === data.Confirmpassword ?
      registerUser(dispatch, data)
      : setFormError("Passwords didn't match!")
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <ListItem button onClick={handleClickOpen}>
        <ListItemIcon>
          <EditIcon />
        </ListItemIcon>
        <ListItemText primary={heading} />
      </ListItem>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
          className="col mt-3 p-5"
        >
          <h5 className="mb-4">{heading}</h5>
          <div className="form-group">
            <input
              required
              type="text"
              name="fname"
              className="form-control"
              aria-describedby="Enter First name"
              placeholder=" First name"
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
            <input
              required
              type="text"
              name="lname"
              className="form-control"
              aria-describedby="Enter last name"
              placeholder=" last name"
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
            <input
              required
              type="tel"
              name="contact"
              className="form-control"
              aria-describedby="Enter Phone no"
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
            <input
              required
              id="inputForEmail"
              type="email"
              name="email"
              className="form-control"
              aria-describedby="Enter email address"
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
          <div className="form-group">
            <input
              required
              type="password"
              name="password"
              className="form-control"
              id="inputForPassword"
              placeholder="Enter password"
              ref={register({
                required: {
                  value: true,
                  message: "Please enter password",
                },
                minLength: {
                  value: 8,
                  message: "Minimum 8 characters are allowed",
                },
                maxLength: {
                  value: 255,
                  message: "Maximum 255 characters are allowed",
                },
              })}
            />
            {errors.password && (
              <Alert
                severity="warning"
                className="errorMessage mandatory text-error"
              >
                {errors.password.message}
              </Alert>
            )}
          </div>
          <div className="form-group">
            <input
              type="password"
              name="Confirmpassword"
              className="form-control"
              id="inputForConfirmPassword"
              placeholder="Confirm Password"
              ref={register({
                required: {
                  value: true,
                  message: "Please confirm your password",
                },
                minLength: {
                  value: 8,
                  message: "Minimum 8 characters are allowed",
                },
                maxLength: {
                  value: 255,
                  message: "Maximum 255 characters are allowed",
                },
              })}
            />
            {errors.Confirmpassword && (
              <Alert severity="warning" className="errorMessage">
                {errors.Confirmpassword.message}
              </Alert>
            )}
          </div>
          {formError !== "" ? (
            <p style={{ color: "red" }}>{formError}</p>
          ) : (
            <p></p>
          )}{" "}
          <button type="submit" className="btn btn-primary col-sm-12 btns">
            {loading ? <Loading /> : "Create"}
          </button>
        </form>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
