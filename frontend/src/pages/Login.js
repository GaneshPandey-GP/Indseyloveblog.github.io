import React from "react";
import { Link, Redirect } from "react-router-dom";
import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { loginUser, useAuthState } from "../context";
import Loading from "../components/Loading";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  Typography,
  Container,
  CssBaseline,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

function Login(props) {;
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
    },
    heading: {
      paddingTop: "23px",
    },
  }));
  const classes = useStyles();
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
      <Card>
         <Container component="main" maxWidth="xs" className={classes.container}>
      <CssBaseline />
      <Card>
        <div style={{ backgroundColor: "#ffe" }}>
          <Typography variant="h4" align="center" className={classes.heading}>
           Login
          </Typography>
          <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
            <div className="form-group">
              <label htmlFor="inputForEmail">Email address</label>
              <span className="mandatory">*</span>
              <input
                id="inputForEmail"
                name="username"
                autoComplete="off"
                type="email"
                className="form-control"
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
                <span>
                  {errors.username.message}
                </span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="inputForPassword">Password</label>
              <span className="mandatory">*</span>
              <input
                type="password"
                name="password"
                autoComplete="off"
                className="form-control"
                id="inputForPassword"
                placeholder="Enter password"
                ref={register({
                  required: {
                    value: true,
                    message: "Please enter password",
                  },
                })}
              />
              {errors.password && (
                <span>
                  {errors.password.message}
                </span>
              )}
            </div>
            {errorMessage ? <p className="lead text-danger">{errorMessage}</p>: <p></p>}
            <div className="d-flex align-items-center">
              <button type="submit" className="btn btn-outline-primary">
                Login
              </button>

              <button className="btn btn-link ml-auto">
                <Link to="/register">New User</Link>
              </button>
            </div>
          </form>
          </CardContent>
        </div>
      </Card>
    </Container>
      </Card>
    </>
  );
}

export default Login;
