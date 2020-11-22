import React from "react";
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from './pages/Dashboard'
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import SadminLogin from "./components/Sadmin";
import CreateTest from "./components/CreateTest";
import { PrivateRoute } from "./config/PrivateRoute";

import TestView from './components/TestView/TestView';
// import SubAdminDashboard from './components/SubAdminDashboard';
import AdminDashboard from "./components/SubAdminDashboard";

const BaseRouter = () => (
    <Router>
            <Switch>
                <Route exact path="/login" component={Login} /> 
                <Route exact path="/subadmlogin" component={SadminLogin} />
                <Route exact path="/createtest" component={CreateTest} />
                <Route exact path="/register" component={Register} />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <Route exact path="/testview" component={TestView} /> 
                <Route exact path="/register" component={Register} />
                <Route exact path="/subadmdashboard" component={AdminDashboard} />
                <Route exact path="*" component={NotFound} />
            </Switch>
    </Router>
);

export default BaseRouter;