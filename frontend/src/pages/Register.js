import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Signup, useAuthState } from "../context";
import "bootstrap/dist/css/bootstrap.min.css";
import { useForm } from "react-hook-form";
import  "./Register.css";
import {
  CardContent,
  Typography,
} from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import Loading from "../components/Loading";

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
    marginTop:15,
  },
  heading: {
    paddingTop: "23px",
  },
}));

export default function Register() {
  // const [formData, setFormData] = useState({
  //   fname: "",
  //   lname: "",
  //   contact: "",
  //   email: "",
  //   password: "",
  //   re_password: "",
  //   created_on: "",
  // });
  const [formError, setFormError] = useState("");
  const [uid, setUid] = useState(0);
  const { register, handleSubmit, errors } = useForm();

  
  const [message, setMessage] = useState();
  const onSubmit = (data, e) => {
    console.log(data);
    e.preventDefault();
    setUid(uid + 1);
    data.password === data.re_password
      ? Signup(dispatch, data, uid)
      : setFormError("Passwords didn't match!");
  };

  const [{ isAuthenticated, loading }, dispatch] = useAuthState();  
  const classes = useStyles();
  if (loading) return <Loading />;
  if (isAuthenticated) return <Redirect to="/login" />;

  return (
    <div className="Wrapper container d-flex align-items-center justify-content-center">
   
   <div className="registrationFormContainer" style={{ backgroundColor: "#ffe" }}>
   <fieldset className="border p-3 rounded">
          <Typography variant="h4" align="center" className={classes.heading}>
            Register
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            gutterBottom
            align="center"
          >
            Create your account.
          </Typography>
          <CardContent>
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              autoComplete="off"
              className="row"
            >
              <div className="form-group col-sm-6">
                <label htmlFor="inputForEmail">First Name</label> 
                {/* <span className="mandatory">*</span> */}
                <input
                  id="inputForEmail"
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
                  <span className="errorMessage mandatory text-error">
                    {errors.fname.message}
                  </span>
                )}
              </div>
              <div className="form-group col-sm-6">
                {/* <label htmlFor="inputForEmail">Last Name</label> */}
                <span className="mandatory">*</span>
                <input
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
                  <span className="errorMessage mandatory text-error">
                    {errors.lname.message}
                  </span>
                )}
              </div>
              <div className="form-group col-sm-12">
                <label htmlFor="inputForEmail">Phone no</label>
                <span className="mandatory">*</span>
                <input
                  id="inputForEmail"
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
                  })}
                />
                {errors.contact && (
                  <span className="errorMessage mandatory text-error">
                    {errors.contact.message}
                  </span>
                )}
              </div>
              <div className="form-group col-sm-12">
                <label htmlFor="inputForEmail">Email address</label>
                <span className="mandatory">*</span>
                <input
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
                  <span className="errorMessage mandatory">
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div className="form-group col-sm-6">
                <label htmlFor="inputForPassword">Password</label>
                <span className="mandatory">*</span>
                <input
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
                      value: 6,
                      message: "Minimum 6 characters are allowed",
                    },
                    maxLength: {
                      value: 255,
                      message: "Maximum 255 characters are allowed",
                    },
                  })}
                />
                {errors.password && (
                  <span className="errorMessage mandatory text-error">
                    {errors.password.message}
                  </span>
                )}
              </div>
              <div className="form-group col-sm-6">
                <label htmlFor="inputForPassword">Re-Password</label>
                <span className="mandatory">*</span>
                <input
                  type="password"
                  name="re_password"
                  className="form-control"
                  id="inputForPassword"
                  placeholder="Enter password"
                  ref={register({
                    required: {
                      value: true,
                      message: "Please enter confirm password",
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
                {errors.re_password && (
                  <span className="errorMessage mandatory text-error">
                    {errors.re_password.message}
                  </span>
                )}
              </div>
              {formError !== "" ? <p style={{color: 'red'}}>{formError}</p> : <p></p>}
              <button
                type="submit"
                className="btn btn-outline-primary col-sm-12"
              >
                Submit
              </button>

              <Link
                className="col-sm-12 mt-3 text-center text-decoration-none"
                to="/login"
                variant="body2"
              >
                {"Already have an account? Sign In"}
              </Link>
            </form>
          </CardContent>
          </fieldset>   
        </div>
     
    
    </div>
  );
}

