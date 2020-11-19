import React from "react";
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from './pages/Dashboard'
import NotFound from "./pages/NotFound";

const BaseRouter = () => (
    <Router>
            <Switch>
                <Route exact path="/login" component={Login} /> 
                <Route exact path="/register" component={Signup} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="*" component={NotFound} />
                <Route exact path="/">
                    <Redirect to="/dashboard" />
                </Route>
            </Switch>
    </Router>
);

export default BaseRouter;