import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import StudentDashboard from './pages/StudentDashboard'
import TestView from './components/StudentDashboard/TestView';
import SubAdminDashboard from "./pages/SubAdminDashboard";
import { AdminPrivateRoute, SubAdminPrivateRoute, StudPrivateRoute  } from "./config/PrivateRoute";
import SubAdminLogin from "./pages/SubAdminLogin";
import Questions from "./pages/Questions";
import StudentView from "./pages/StudentView";
import YourResults from "./components/StudentDashboard/YourResults";
import Submission from "./components/StudentDashboard/Submission";
import SAResults from "./components/SubAdminDashboard/SAResults"
import ViewSubmission from "./components/SubAdminDashboard/ViewSubmission"

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

const BaseRouter = () => (
    <Router>
            <Switch>
                <Route exact path="/login" component={Login} /> 
                <Route exact path="/admin" component={AdminLogin} />
                <Route exact path="/sub-admin-login" component={SubAdminLogin} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/add-questions" component={Questions} />
                <Route exact path="/results" component={SAResults} />
                <Route exact path="/view-submission" component={ViewSubmission} />
                <AdminPrivateRoute exact path="/admin-dashboard" component={AdminDashboard} />
                <SubAdminPrivateRoute exact path="/sub-admin-dashboard" component={SubAdminDashboard} />
                <Route exact path="/stud-dashboard" component={StudentDashboard} />
                <StudPrivateRoute exact path="/test" component={TestView} /> 
                <StudPrivateRoute exact path="/subject-test-view" component={StudentView} />
                <StudPrivateRoute exact path="/submission" component={Submission} />
                <StudPrivateRoute exact path="/your-results" component={YourResults} />
                <Route exact path="*" component={NotFound} />
            </Switch>
    </Router>
);

export default BaseRouter;