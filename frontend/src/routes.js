import React from "react";
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import StudentDashboard from './pages/StudentDashboard'
import TestView from './components/TestView/TestView';
import SubAdminDashboard from "./pages/SubAdminDashboard";
import { AdmPrivateRoute, StudPrivateRoute  } from "./config/PrivateRoute";
import SubAdminLogin from "./pages/SubAdminLogin";
import Questions from "./pages/Questions";

const BaseRouter = () => (
    <Router>
            <Switch>
                <Route exact path="/login" component={Login} /> 
                <Route exact path="/sub-admin-login" component={SubAdminLogin} />
                <Route exact path="/add-questions" component={Questions} />
                <Route exact path="/testview" component={TestView} /> 
                <Route exact path="/register" component={Register} />
                <AdmPrivateRoute exact path="/sub-admin-dashboard" component={SubAdminDashboard} />
                <StudPrivateRoute exact path="/stud-dashboard" component={StudentDashboard} />
                <Route exact path="*" component={NotFound} />
            </Switch>
    </Router>
);

export default BaseRouter;