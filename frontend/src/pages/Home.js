import React from "react";
import "./home.css";
import { Typography } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import { useEffect } from "react";


function Home() {
    useEffect(() => {
        localStorage.clear()
    }, [])
  return (
    <div className="home">
      <nav className="nav__bar">
        <div className="d-flex justify-content-around">
        <div className="nav__btn">
            <LocalLibraryIcon style={{fontSize: '50px'}}/>
        </div>
          <div className="nav__btn">
              <NavLink className="nav__btn__link btn1" to="/register">Sign Up</NavLink>
              <NavLink className="nav__btn__link btn2" to="/login">Sign In</NavLink>
          </div>
        </div>
      </nav>

    <div className="container text-center">
        <Typography variant="h2">Talent Assessment Portal</Typography>
        <div className="mt-5">
            <NavLink className="nav__btn__link btn3" to="/login" role="button">Get Started</NavLink>
        </div>
    </div>
    </div>
  );
}

export default Home;
