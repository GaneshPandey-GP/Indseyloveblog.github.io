import React, { useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { loginUser, useAuthState } from "../context";
import { Loading } from "../components/Loading";
import { useForm } from "react-hook-form";
import Alert from "@material-ui/lab/Alert";

function Login(props) {
  useEffect(() => {
    try{
      localStorage.clear();
    } catch(err) {
      console.log(err)
    }
  },[])
  const { register, handleSubmit, errors } = useForm();
  const [{ isAuthenticated, loading, errorMessage }, dispatch] = useAuthState();
  const onSubmit = (data, e) => {
    e.preventDefault();
    loginUser(dispatch, data);
    console.log(data);
  };

  if (isAuthenticated) return <Redirect to="/stud-dashboard" />;

  return (
    <>
    <div className="wrapper">
      <div className="login-box">
        <i className="fas fa-user-circle fa-4x head"></i>

        <h1 className="text-center bold">Login</h1>

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
              <Alert  severity="warning" className="errorMessage text-capitalize ml-5">
               {errors.username.message}
              </Alert>
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
            /><br/>

            {errors.password && (
              <Alert severity="warning"  className="errorMessage text-capitalize ml-5">
                {errors.password.message}
              </Alert>
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
            <Link to="/register">{"Don't have an account? Sign Up"}</Link>
          </div>
        </form>
      </div>
      </div>
    </>
  );
}

export default Login;
