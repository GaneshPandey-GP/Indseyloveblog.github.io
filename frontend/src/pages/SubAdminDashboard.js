import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import DashboardData from '../components/SubAdminDashboard/DashboardData'
import { getSubjects, getTests, getCategories, getLinks, useAuthState, readUser4Client } from "../context";

function SubAdminDashboard() {
  const [{subjects, isAuthenticated}, dispatch] = useAuthState()
  useEffect(() => {
    getSubjects(dispatch)
    getTests(dispatch)
    getCategories(dispatch)
    getLinks(dispatch)
    readUser4Client(dispatch)
  }, [])
  if (!isAuthenticated) return <Redirect to="/sub-admin-login" />

  return (
    <>
      <div>
        <DashboardData/>
      </div>
    </>
  );
}

export default SubAdminDashboard;
