import React, { useEffect } from "react";
import { TestCard } from "../components/StudentDashboard/TestCard";
import SelectSubject from "../components/StudentDashboard/SelectSubject";

import { useAuthState } from "../context";
import { getSubjects, getTests } from "../context/actions";

export default function StudentDashboard() {
  const [{ tests }, dispatch] = useAuthState()
  useEffect(() => {
    getTests(dispatch)
    getSubjects(dispatch, localStorage.getItem("categoryid"))

  }, [])

  return (
    <>
      <SelectSubject />
    </>
  );
}
