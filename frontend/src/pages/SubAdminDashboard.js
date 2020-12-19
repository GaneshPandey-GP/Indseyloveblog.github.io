import React, { useEffect } from "react";
import DashboardData from '../components/SubAdminDashboard/DashboardData'
import { getSubjects, getTests, getCategories, getLinks, useAuthState, readUser4Client } from "../context";

function SubAdminDashboard() {
  const [{subjects}, dispatch] = useAuthState()
  useEffect(() => {
    getSubjects(dispatch)
    getTests(dispatch)
    getCategories(dispatch)
    getLinks(dispatch)
    readUser4Client(dispatch)
  }, [])
  return (
    <>
      <div>
        <DashboardData/>
      </div>
    </>
  );
}

export default SubAdminDashboard;
