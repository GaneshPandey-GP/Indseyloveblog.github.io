import React from "react";
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import StudentDashboard from './pages/StudentDashboard'
import TestView from './components/StudentDashboard/TestView';
import SubAdminDashboard from "./pages/SubAdminDashboard";
import { AdmPrivateRoute, StudPrivateRoute  } from "./config/PrivateRoute";
import SubAdminLogin from "./pages/SubAdminLogin";
import Questions from "./pages/Questions";
import StudentView from "./pages/StudentView";
import Result from "./components/StudentDashboard/Result";
import history from './config/history'
import TestDetails from './components/StudentDashboard/TestDetails'

const BaseRouter = () => (
    <Router history={history}>
            <Switch>
                <Route exact path="*" component={NotFound} />
                <Route exact path="/login" component={Login} /> 
                <Route exact path="/sub-admin-login" component={SubAdminLogin} />
                <Route exact path="/register" component={Register} />

                <AdmPrivateRoute exact path="/add-questions" component={Questions} />
                <StudPrivateRoute exact path="/subject-test-view" component={StudentView} />
                <StudPrivateRoute exact path="/test" component={TestView} /> 
                <StudPrivateRoute exact path="/test-details" component={TestDetails} />
                <AdmPrivateRoute exact path="/sub-admin-dashboard" component={SubAdminDashboard} />
                <StudPrivateRoute exact path="/stud-dashboard" component={StudentDashboard} />
                <StudPrivateRoute exact path="/result" component={Result} />
            </Switch>
    </Router>
);

export default BaseRouter;