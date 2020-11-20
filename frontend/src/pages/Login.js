import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Input, Button } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const login = async (username, password) => {
    const data = {
      "database": "ExaminationSystem",
      "collection": "users",
      "username": username,
      "password": password,
    };
    console.log(data);
    await axios
      .post("http://127.0.0.1:5001/login", data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  const [loading, setLoading] = useState(false);
  const handleFormSubmit = (e) => {
    e.preventDefault();
    login(username, password);
    // SignInFunction

    setLoading(true);
  };

  const { username, password } = formData;

  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <>
      <Card>
        <div className="login-box">
          <form>
            <div className="head">Login</div>

            <div className="textbox">
              <i className="fa fa-envelope"></i>
              <Input
                type="text"
                id="username"
                placeholder="Enter Your Email.."
                name="username"
                required
                autoComplete="username"
                value={username || ""}
                onChange={(e) => handleInputChange(e)}
              />
            </div>

            <div className="textbox">
              <i className="fas fa-lock"></i>
              <Input
                required
                id="password"
                className="input "
                type="password"
                name="password"
                placeholder="Enter Your Password.."
                value={password || ""}
                autoComplete="current-password"
                onChange={(e) => handleInputChange(e)}
              />
              <br />
            </div>

            <Button
              className="btn mt-4 btn-primary"
              style={{
                background: "#0f0827",
                color: "#d3cbee",
                margin: "0px 15px",
              }}
              onClick={handleFormSubmit}
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
                  Don't have an Account, Sign Up"
                </Link>
              </div>
            </div>
          </form>
        </div>
      </Card>
    </>
  );
}

export default Login;
