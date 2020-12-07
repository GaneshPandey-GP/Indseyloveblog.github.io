import React, { useEffect } from "react";
import SelectSubject from "../components/StudentDashboard/SelectSubject";

import { useAuthState } from "../context";
import { getSubjects4Client } from "../context";

export default function StudentDashboard() {
  const [{ }, dispatch] = useAuthState()
  useEffect(() => {
    getSubjects4Client(dispatch, localStorage.getItem("categoryid"))
  }, [])

  return (
    <>
      <SelectSubject />
    </>
  );
}
