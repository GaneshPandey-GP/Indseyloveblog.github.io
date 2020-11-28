import React from "react";
import { Link, Redirect } from "react-router-dom";
import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { loginUser, useAuthState } from "../context";
import { Loading } from "../components/Loading";
import { useForm } from "react-hook-form";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

function Login(props) {
  const { register, handleSubmit, errors } = useForm();
  const [{ isAuthenticated, loading, errorMessage }, dispatch] = useAuthState();
  const onSubmit = (data, e) => {
    e.preventDefault();
    loginUser(dispatch, data);
    console.log(data);
  };

  if (loading) return <Loading />;
  if (isAuthenticated) return <Redirect to="/stud-dashboard" />;

  return (
    <>
      <div className="login-box">
        <i className="fas fa-user-circle fa-4x head"></i>

        <h1 className="text-center bold">Login</h1>

        <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
          <div className="form-group textbox">
            <i class="fas fa-envelope"></i>
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
            <i class="fas fa-lock"></i>
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
            <button type="submit" className="btn btn-primary btn">
              Login
            </button>
          </div>
          <div className="links">
            <Link to="/"> {"Forgot Password?"}</Link>
            <br />
            <Link to="/register">{"Already have an account? Sign In"}</Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
