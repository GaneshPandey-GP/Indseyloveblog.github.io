import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Signup, useAuthState} from '../context';
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
    maxWidth: "51ch",
  },
  heading: {
    paddingTop: "23px",
  },
}));

export default function Register() {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    contact: "",
    email: "",
    password: "",
    re_password: "",
    created_on: "",
  });
  const [uid, setUid] = useState(0);
  const [formError, setFormError] = useState('')
  const username = "testuser"
  const [{isAuthenticated, loading}, dispatch] = useAuthState()

  const { fname, lname, contact, email, password, re_password } = formData;

  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setUid(uid + 1);
    password === re_password ?
      Signup(dispatch, username, fname, lname, contact, email, password, uid)
    : setFormError("Passwords didn't match!")
  };
  const classes = useStyles();
  if(loading) return (<Loading />)
  if (isAuthenticated)
    return <Redirect to='/login' />

  return (
    <Container component="main" className={classes.container}>
      <CssBaseline />
      <Card>
        <div style={{ backgroundColor: "#ffe" }}>
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
              className={classes.root}
              noValidate
              onSubmit={handleFormSubmit}
            >
              <TextField
                margin="normal"
                required
                id="fname"
                style={{ width: "17.9ch" }}
                label="First Name"
                name="fname"
                type="text"
                value={fname || ""}
                autoComplete="fname"
                variant="outlined"
                autoFocus
                onChange={(e) => handleInputChange(e)}
              />
              <TextField
                required
                style={{ width: "17.9ch" }}
                id="lname"
                label="Last Name"
                name="lname"
                type="text"
                value={lname || ""}
                autoComplete="lname"
                variant="outlined"
                autoFocus
                onChange={(e) => handleInputChange(e)}
              />
              <TextField
                required
                style={{ width: "38ch" }}
                id="contact"
                type="tel"
                label="contact Number"
                name="contact"
                value={contact || ""}
                autoComplete="contact"
                variant="outlined"
                autoFocus
                onChange={(e) => handleInputChange(e)}
              />
              <TextField
                required
                style={{ width: "38ch" }}
                id="email"
                label="Email Address"
                name="email"
                type="email"
                value={email || ""}
                autoComplete="email"
                variant="outlined"
                autoFocus
                onChange={(e) => handleInputChange(e)}
              />
              <TextField
                required
                name="password"
                label="Password"
                style={{ width: "17.9ch" }}
                type="password"
                id="password"
                variant="outlined"
                value={password || ""}
                autoComplete="current-password"
                onChange={(e) => handleInputChange(e)}
              />
              <TextField
                required
                name="re_password"
                label="re_Password"
                value={re_password || ""}
                style={{ width: "17.9ch" }}
                type="password"
                id="re_password"
                variant="outlined"
                autoComplete="re_password"
                onChange={(e) => handleInputChange(e)}
              />
              {formError !== "" ? <p style={{color: 'red'}}>{formError}</p> : <p></p>}
              <Button
                type="submit"
                style={{ width: "38ch" }}
                variant="contained"
                color="primary"
                className="submit__btn"
                onClick={handleFormSubmit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link to="/login" variant="body2">
                    {"Already have an account? Sign In"}
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
