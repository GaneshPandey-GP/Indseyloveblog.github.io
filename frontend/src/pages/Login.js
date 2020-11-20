import React, { useReducer, useState } from "react";
import { Link } from "react-router-dom";
import { Input, Button, Card } from "@material-ui/core";
import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { reducer, initialState } from "../context/reducer";
import { loginUser, useAuthState } from "../context";

function Login(props) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const { username, password } = formData;
  const dispatch = reducer()

  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    loginUser(dispatch, username, password);
  };
  const [{isAuthenticated, loading}] = useAuthState()
  console.log(isAuthenticated, loading) 
  
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
