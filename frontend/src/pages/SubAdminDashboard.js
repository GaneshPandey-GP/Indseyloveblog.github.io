import React, { useEffect } from "react";
import DashboardData from '../components/SubAdminDashboard/DashboardData'
import { useAuthState } from "../context";
import { getSubjects, getTests, getCategories } from "../context";

function SubAdminDashboard() {
  const [{subjects}, dispatch] = useAuthState()
  useEffect(() => {
    getSubjects(dispatch)
    getTests(dispatch)
    getCategories(dispatch)
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
