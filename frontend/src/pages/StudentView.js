import React, { useEffect } from "react";
import SelectSubject from "../components/StudentDashboard/SelectSubject";

import { useAuthState } from "../context";
import { getSubjects4Client, getTests4Client } from "../context";

export default function StudentDashboard() {
  const [{ tests }, dispatch] = useAuthState()
  useEffect(() => {
    getTests4Client(dispatch)
    getSubjects4Client(dispatch, localStorage.getItem("categoryid"))

  }, [])

  return (
    <>
      <SelectSubject />
    </>
  );
}
