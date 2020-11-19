import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  Typography,
  Container,
  Grid,
  Link,
  TextField,
  CssBaseline,
  Button,
} from "@material-ui/core";

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

export default function SignIn() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    password: "",
    re_password: "",
    created_on: ""
  });
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  const handleFormSubmit = (e) => {
    e.preventDefault()

    // SignupFunction
    
    setLoading(true)
  }

    const {
      first_name,
      last_name,
      phone,
      email,
      password,
      re_password,
      created_on,
    } = formData;

    const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

    return (
      <Container component="main" className={classes.container}>
        <CssBaseline />
        <Card>
        <div style={{ backgroundColor: '#ffe'}}>
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
                id="first_name"
                style={{ width: "17.9ch" }}
                label="First Name"
                name="first_name"
                type="text"
                value={first_name || ''}
                autoComplete="first_name"
                variant="outlined"
                autoFocus
                onChange={(e) => handleInputChange(e)}
              />
              <TextField
                required
                style={{ width: "17.9ch" }}
                id="last_name"
                label="Last Name"
                name="last_name"
                type="text"
                value={last_name || ''}
                autoComplete="last_name"
                variant="outlined"
                autoFocus
                onChange={(e) => handleInputChange(e)}
              />
              <TextField
                required
                style={{ width: "38ch" }}
                id="phone"
                type="tel"
                label="Phone Number"
                name="phone"
                value={phone || ''}
                autoComplete="phone"
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
                value={email || ''}
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
                value={password || ''}
                autoComplete="current-password"
                onChange={(e) => handleInputChange(e)}
              />
              <TextField
                required
                name="re_password"
                label="re_Password"
                value={re_password || ''}
                style={{ width: "17.9ch" }}
                type="password"
                id="re_password"
                variant="outlined"
                autoComplete="re_password"
                onChange={(e) => handleInputChange(e)}
              />
              <Button
                type="submit"
                style={{ width: "38ch" }}
                variant="contained"
                color="primary"
                className="submit__btn"
                onSubmit={handleFormSubmit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/login" variant="body2">
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
  };
