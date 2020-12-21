import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import DashboardData from '../components/SubAdminDashboard/DashboardData'
import { getSubjects, getTests, getCategories, getLinks, useAuthState, readUser4Client } from "../context";

function SubAdminDashboard() {
  const [{user}, dispatch] = useAuthState()
  useEffect(() => {
    getSubjects(dispatch)
    getTests(dispatch)
    getCategories(dispatch)
    getLinks(dispatch)
    readUser4Client(dispatch)
  }, [])
  if (!user) return <Redirect to="/sub-admin-login" />

  return (
    <>
      <div>
        <DashboardData/>
      </div>
    </>
  );
}

export default SubAdminDashboard;
