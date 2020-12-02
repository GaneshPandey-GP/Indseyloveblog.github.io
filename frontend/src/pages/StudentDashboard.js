import React, { useEffect } from "react";
import { TestCard } from "../components/StudentDashboard/TestCard";
import SelectSubject from "../components/StudentDashboard/SelectSubject";
import { useAuthState } from "../context";
import { getSubjects } from "../context/actions";

export default function StudentDashboard() {
  const [{ tests }, dispatch] = useAuthState()
  useEffect(() => {
    return(
    getSubjects(dispatch)
  )
  }, [])

  return (
    <>
      <SelectSubject />
      {tests? <TestCard /> : <div></div>}
    </>
  );
}
