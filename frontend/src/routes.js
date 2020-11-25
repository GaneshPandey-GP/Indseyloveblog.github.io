import React from "react";
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import CreateTest from "./components/CreateTest";
import StudentDashboard from './pages/StudentDashboard'
import TestView from './components/TestView/TestView';
import SubAdminDashboard from "./pages/SubAdminDashboard";
import { PrivateRoute } from "./config/PrivateRoute";
import SubAdminLogin from "./pages/SubAdminLogin";

const BaseRouter = () => (
    <Router>
            <Switch>
                <Route exact path="/login" component={Login} /> 
                <Route exact path="/sub-admin-login" component={SubAdminLogin} />
                <Route exact path="/createtest" component={CreateTest} />
              
                <Route exact path="/testview" component={TestView} /> 
                <Route exact path="/register" component={Register} />
                <PrivateRoute exact path="/sub-admin-dashboard" component={SubAdminDashboard} />
                <PrivateRoute exact path="/stud-dashboard" component={StudentDashboard} />
                <Route exact path="*" component={NotFound} />
            </Switch>
    </Router>
);

export default BaseRouter;