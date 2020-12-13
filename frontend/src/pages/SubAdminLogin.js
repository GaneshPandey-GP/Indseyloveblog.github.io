import React, { useEffect } from "react";
import { adminlogin, useAuthState } from "../context";
import { useForm } from "react-hook-form";
import "./Login.css";
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { Link, Redirect } from "react-router-dom";
import { Loading } from "../components/Loading";



export default function SubAdminLogin() {
  const { register, handleSubmit, errors } = useForm();
  const [{ loading, isAuthenticated, errorMessage }, dispatch] = useAuthState()
  useEffect(() => {
    try{
      localStorage.clear();
    } catch(err) {
      console.log(err)
    }
  },[])
  const onSubmit = (data, e) => {
    e.preventDefault();
    adminlogin(dispatch, data);
    console.log(data);
  };


  if (isAuthenticated) return <Redirect to="/sub-admin-dashboard" />;

  return (
    <div className="wrapper">

    
    <div className="login-box">
      <i className="fas fa-user-circle fa-4x head"></i>

      <h1 className="text-center">Admin Login</h1>

      <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
        <div className="form-group textbox">
          <i className="fas fa-envelope"></i>
          <input
            required
            id="inputForEmail"
            name="username"
            autoComplete="off"
            type="email"
            className="form-control input"
            aria-describedby="Enter email address"
            placeholder="Enter email address"
            ref={register({
              required: {
                value: true,
                message: "Please enter Your Email",
              },
            })}
          />

          {errors.username && (
            <span className="errorMessage text-capitalize">
              <ErrorOutlineIcon /> {errors.username.message}
            </span>
          )}
        </div>
        <div className="form-group textbox">
          <i className="fas fa-lock"></i>
          <input
            type="password"
            name="password"
            autoComplete="off"
            className="form-control input"
            id="inputForPassword"
            placeholder="Enter password"
            ref={register({
              required: {
                value: true,
                message: "Please  Enter Your password",
              },
            })}
          />

          {errors.password && (
            <span className="errorMessage text-capitalize">
              <ErrorOutlineIcon /> {errors.password.message}
            </span>
          )}
        </div>
        {errorMessage ? (
          <p className="lead text-danger">{errorMessage}</p>
        ) : (
          <p></p>
        )}
        <div className="d-flex align-items-center">
          <button type="submit" className="btn btn-primary btns">
          {loading? <Loading />: "Login"}
          </button>
        </div>
        <div className="links">
          <Link to="/"> {"Forgot Password?"}</Link>
          <br />
          <Link to="/register">{"Already have an account? Sign In"}</Link>
        </div>
      </form>
    </div>
    </div>
  );
}
