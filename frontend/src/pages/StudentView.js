import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import SelectSubject from "../components/StudentDashboard/SelectSubject";

import { useAuthState } from "../context";
import { getSubjects4Client } from "../context";

export default function StudentDashboard() {
  const [{ user, isAuthenticated }, dispatch] = useAuthState()
  useEffect(() => {
    getSubjects4Client(dispatch, localStorage.getItem("categoryid"))
  }, [])
  localStorage.setItem("testsGiven", JSON.stringify(user[0].testsGiven))
  localStorage.setItem("contact", user[0].contact)
  localStorage.setItem("email", user[0].email)
  localStorage.setItem("lname", user[0].lname)
  localStorage.setItem("fname", user[0].fname)
  // if (!isAuthenticated) return <Redirect to="/login" />

  return (
    <>
      <SelectSubject />
    </>
  );
}
