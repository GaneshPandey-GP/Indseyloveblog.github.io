import React, { useEffect } from "react";
import SelectCategory from "../components/StudentDashboard/SelectCategory";
import { useAuthState } from "../context";
import { getCategories4Client, getSubjects4Client, getTests4Client } from "../context";

export default function StudentDashboard() {
  const [{ tests }, dispatch] = useAuthState()
  useEffect(() => {
    getTests4Client(dispatch)
    getSubjects4Client(dispatch)
    getCategories4Client(dispatch)
  }, [])

  return (
    <>
      <SelectCategory/>
    </>
  );
}
