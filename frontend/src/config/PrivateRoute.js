import React from "react";
import { Redirect, Route } from "react-router-dom";

export const AdmPrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem("user.level") === '1' ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/sub-admin-login" }}
        />
      )
    }
  />
);

export const StudPrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem("user.level") === '2' ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/login" }}
        />
      )
    }
  />
);

export const AdminPrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem("user.level") === '3' ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/admin" }}
        />
      )
    }
  />
);