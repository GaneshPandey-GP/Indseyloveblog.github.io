import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Input, Button } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {
  const [user, setUser] = useState();
  const [password, setPassword] = useState();

  const passwordEvent = (e) => {
    setPassword(e.target.value);
  };
  const emailEvent = (e) => {
    setUser(e.target.value);
  };
  const submitEvent = () => {
    if (user === "youremail" && password === "yourpassword") {
      alert("welcome!");
    } else {
      alert("check your email or password!");
    }
    console.log(user.email);
    console.log(user.password);
    // <Redirect to="/home"/>
  };

  return (
    <>
      <Card>
        <div className="login-box">
          <div className="head">Login</div>
          <div className="textbox">
            <i className="fa fa-envelope"></i>
            <Input
              type="email"
              placeholder="Enter Your Email.."
              name="email"
              value={user}
              onChange={emailEvent}
            />
          </div>

          <div className="textbox">
            <i className="fas fa-lock"></i>
            <Input
              className="input "
              type="password"
              name="password"
              placeholder="Enter Your Password.."
              value={password}
              onChange={passwordEvent}
            />
            <br />
          </div>

          <Button
            className="btn mt-4"
            style={{
              background: "#0f0827",
              color: "#d3cbee",
              margin: "0px 15px",
            }}
            onClick={submitEvent}
          >
            Login
          </Button>
          <br />
          <div className="row mt-3 pt-2 text-capitalize">
            <div className="col-sm-12">
              <Link to="#" className="link1 col-sm-6">
                Forgot password?
              </Link>
            </div>
            <div className="col-sm-12">
              <Link to="/register" className="link1 col-sm-6">
                Are you a new Member?
              </Link>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}

export default Login;
