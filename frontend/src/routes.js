import React from "react";
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from './pages/Dashboard'
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import SadminLogin from "./components/Sadmin";
import CreateTest from "./components/CreateTest";
import { PrivateRoute } from "./config/PrivateRoute";

const BaseRouter = () => (
    <Router>
            <Switch>
                <Route exact path="/login" component={Login} /> 
                <Route exact path="/subadmin" component={SadminLogin} />
                <Route exact path="/createtest" component={CreateTest} />
                <Route exact path="/register" component={Register} />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <Route exact path="*" component={NotFound} />
            </Switch>
    </Router>
);

export default BaseRouter;