import React, { useEffect } from "react";
import SelectSubject from "../components/StudentDashboard/SelectSubject";

import { readUser, useAuthState } from "../context";
import { getSubjects4Client } from "../context";

export default function StudentDashboard() {
  const [{ user }, dispatch] = useAuthState()
  useEffect(() => {
    getSubjects4Client(dispatch, localStorage.getItem("categoryid"))
    readUser(dispatch)
  }, [])
  localStorage.setItem("testsGiven", JSON.stringify(user[0].testsGiven))

  return (
    <>
      <SelectSubject />
    </>
  );
}
