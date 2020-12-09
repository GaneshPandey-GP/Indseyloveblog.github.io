import React, { useEffect } from "react";
import DashboardData from '../components/SubAdminDashboard/DashboardData'
import { getSubjects, getTests, getCategories, getLinks, useAuthState } from "../context";

function SubAdminDashboard() {
  const [{subjects}, dispatch] = useAuthState()
  useEffect(() => {
    getSubjects(dispatch)
    getTests(dispatch)
    getCategories(dispatch)
    getLinks(dispatch)
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
