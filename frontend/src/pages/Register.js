import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Signup, useAuthState } from "../context";
import "bootstrap/dist/css/bootstrap.min.css";
import { useForm } from "react-hook-form";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import MailOutlineOutlinedIcon from "@material-ui/icons/MailOutlineOutlined";
import HttpsOutlinedIcon from "@material-ui/icons/HttpsOutlined";
import PersonOutlinedIcon from "@material-ui/icons/PersonOutlined";
import "./Register.css";
import Alert from "@material-ui/lab/Alert";
import ScopedCssBaseline from "@material-ui/core/ScopedCssBaseline";

import { Link, Redirect } from "react-router-dom";
import { Loading } from "../components/Loading";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },

  container: {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    position: "absolute",
    maxWidth: "51ch",
    marginTop: 15,
  },
  heading: {
    paddingTop: "23px",
  },
}));

export default function Register() {
  const [formError, setFormError] = useState("");
  const { register, handleSubmit, errors } = useForm();

  const [message, setMessage] = useState();
  const onSubmit = (data, e) => {
    console.log(data);
    e.preventDefault();
    // data.password === data.re_password
      Signup(dispatch, data)
      // : setFormError("Passwords didn't match!");
  };

  const [{ isAuthenticated, loading }, dispatch] = useAuthState();
  const classes = useStyles();
  if (loading) return <Loading />;
  if (isAuthenticated) return <Redirect to="/login" />;

  return (
    <div className="Wrapper container d-flex align-items-center justify-content-center">
      <div
        className="registrationFormContainer"
        style={{ backgroundColor: "#ffe" }}
      >
        <fieldset className="border p-3 rounded">
          <div className="header mb-3">
            <h1 className="text-center bold text-info">Register</h1>
            <h6 className="text-center text-info">Create your account.</h6>
          </div>
          <ScopedCssBaseline />
          <form
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
            className="row"
          >
            <div className="form-group col-sm-12 box">
              <i>
                <PersonOutlinedIcon />
              </i>
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
            <div className="form-group col-sm-12 box">
              <i>
                <PersonOutlinedIcon />
              </i>
              <input
                required
                id="inputForEmail"
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
            <div className="form-group col-sm-12 box">
              <i>
                <PhoneAndroidIcon />
              </i>
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
            <div className="form-group col-sm-12 box">
              <i>
                <MailOutlineOutlinedIcon />
              </i>
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
            <div className="form-group col-sm-12 box">
              <i>
                <HttpsOutlinedIcon />
              </i>
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
            <div className="form-group col-sm-12 box">
              <i>
                <HttpsOutlinedIcon />
              </i>
              <input
                type="password"
                name="Confirmpassword"
                className="form-control"
                id="inputForPassword"
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
            )}
            <button type="submit" className="btn btn-primary col-sm-12 btns">
              Submit
            </button>
            <span className="ml-5">
              <Link
                className=" mt-2 text-center text-decoration-none ml-5"
                to="/login"
                variant="body2"
              >
                {"Already have an account? Sign In"}
              </Link>
            </span>
          </form>
        </fieldset>
      </div>
    </div>
  );
}