import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {adminlogin, useAuthState} from '../context';
import {
  Card,
  CardContent,
  Typography,
  Container,
  Grid,
  TextField,
  CssBaseline,
  Button,
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
  },
  heading: {
    paddingTop: "23px",
  },
}));

export default function SubAdminLogin() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = formData;
  const [{loading, isAuthenticated, errorMessage}, dispatch] = useAuthState()

  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    adminlogin(dispatch, username, password)
  };

 const classes = useStyles();
  if(loading) return (<Loading />)
  if (isAuthenticated)
    return <Redirect to='/sub-admin-dashboard' />

 
  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <CssBaseline />
      <Card>
        <div style={{ backgroundColor: "#ffe" }}>
          <Typography variant="h4" align="center" className={classes.heading}>
            Admin Login
          </Typography>
          <CardContent>
            <form
              className={classes.root}
              noValidate
              onSubmit={handleFormSubmit}
            >
              <TextField
                required
                fullWidth
                id="username"
                label="username "
                name="username"
                type="username"
                value={username || ""}
                autoComplete="username"
                variant="outlined"
                autoFocus
                onChange={(e) => handleInputChange(e)}
              />
              <TextField
                required
                name="password"
                label="Password"
                fullWidth
                type="password"
                id="password"
                variant="outlined"
                value={password || ""}
                autoComplete="current-password"
                onChange={(e) => handleInputChange(e)}
              />
              {errorMessage ? <p className="lead text-danger">{errorMessage}</p>: <p></p>}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className="submit__btn"
                onSubmit={handleFormSubmit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link to="/login" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                  <br />
                  <Link to="/forgotpassword" variant="body2">
                    {"Forgot password"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </div>
      </Card>
    </Container>
  );
}
