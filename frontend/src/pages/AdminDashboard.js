import React, { useEffect } from "react";
import DashboardData from '../components/AdminDashboard/DashboardData'
import { useAuthState } from "../context";
// import { getSubjects, getTests, getCategories, getLinks, useAuthState, readUser } from "../context";

function AdminDashboard() {
  const [{}, dispatch] = useAuthState()
  useEffect(() => {
    // getSubjects(dispatch)
    // getTests(dispatch)
    // getCategories(dispatch)
    // getLinks(dispatch)
    // readUser(dispatch)

  }, [])
  return (
    <>
      <div>
        <DashboardData/>
      </div>
    </>
  );
}

export default AdminDashboard;
