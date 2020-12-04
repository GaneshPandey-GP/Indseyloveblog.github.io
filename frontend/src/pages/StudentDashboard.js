import React, { useEffect } from "react";
import { TestCard } from "../components/StudentDashboard/TestCard";
import SelectSubject from "../components/StudentDashboard/SelectSubject";
import SelectCategory from "../components/StudentDashboard/SelectCategory";
import { useAuthState } from "../context";
import { getSubjects, getTests, getCategories } from "../context/actions";

export default function StudentDashboard() {
  const [{ tests }, dispatch] = useAuthState()
  useEffect(() => {
    getTests(dispatch)
    getSubjects(dispatch)
    getCategories(dispatch)
  }, [])

  return (
    <>
      {/* <SelectSubject />
      {tests? <TestCard /> : <div></div>} */}
<SelectCategory/>
      
    </>
  );
}
