import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import SelectSubject from "../components/StudentDashboard/SelectSubject";

import { useAuthState } from "../context";
import { getSubjects4Client } from "../context";

export default function StudentDashboard() {
  const [{ user }, dispatch] = useAuthState()
  const category = localStorage.getItem("category");
  const categoryid = localStorage.getItem("categoryid");

  useEffect(() => {
    getSubjects4Client(dispatch, localStorage.getItem("categoryid"))
  }, [])
  if (categoryid === null || categoryid === 'undefined' || user === "undefined" || user === null) return <Redirect to="/stud-dashboard" />;
  return (
    <>
      <SelectSubject />
    </>
  );
}
