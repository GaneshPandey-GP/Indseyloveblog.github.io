import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import SelectCategory from "../components/StudentDashboard/SelectCategory";
import { getLinks4Client, readUser4Client, useAuthState } from "../context";
import { getCategories4Client } from "../context";

export default function StudentDashboard() {
  const [{ user, isAuthenticated }, dispatch] = useAuthState();
  localStorage.setItem("testsGiven", JSON.stringify(user[0].testsGiven))
  localStorage.setItem("contact", user[0].contact)
  localStorage.setItem("email", user[0].email)
  localStorage.setItem("lname", user[0].lname)
  localStorage.setItem("fname", user[0].fname)
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

    if (!isAuthenticated) return <Redirect to="/login" />
  }, []);
  return (
    <>
      <SelectCategory />
    </>
  );
}
