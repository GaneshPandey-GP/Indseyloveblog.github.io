import React, { useEffect } from "react";
import SelectCategory from "../components/StudentDashboard/SelectCategory";
import { readUser, useAuthState } from "../context";
import { getCategories4Client } from "../context";

export default function StudentDashboard() {
  const [{ user }, dispatch] = useAuthState();
  useEffect(() => {
    readUser(dispatch)
    try {
      localStorage.removeItem("testid");
      localStorage.removeItem("testtime");
      localStorage.removeItem("testname");
      localStorage.removeItem("categoryid");
      localStorage.removeItem("totalMarks");
      localStorage.removeItem("timer");
      localStorage.removeItem("category");
    } catch (err) {
      console.log(err);
    }
    getCategories4Client(dispatch);
  }, []);
  localStorage.setItem("testsGiven", JSON.stringify(user[0].testsGiven))
  return (
    <>
      <SelectCategory />
    </>
  );
}
