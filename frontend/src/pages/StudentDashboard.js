import React, { useEffect } from "react";
import SelectCategory from "../components/StudentDashboard/SelectCategory";
import { getLinks4Client, readUser4Client, useAuthState } from "../context";
import { getCategories4Client } from "../context";

export default function StudentDashboard() {
  const [{ }, dispatch] = useAuthState();
  useEffect(() => {
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
    getLinks4Client(dispatch)
    readUser4Client(dispatch)
  }, []);
  return (
    <>
      <SelectCategory />
    </>
  );
}
