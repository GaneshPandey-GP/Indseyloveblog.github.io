import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import Nav from "./Nav";
import { useAuthState, viewResults4Client } from "../../context";
import { Link, Redirect } from "react-router-dom";
import { CSVLink } from "react-csv";
import History from "../History";
import Skeleton from "@material-ui/lab/Skeleton";

const YourResults = () => {
  const [{ results, submission, loading, user }, dispatch] = useAuthState();
  const today = new Date();
  const current = today.toLocaleString("en-US", { timeZone: "Asia/Kolkata" });

  useEffect((testid) => {
    try {
      localStorage.removeItem("testid");
      localStorage.removeItem("testtime");
      localStorage.removeItem("testname");
      localStorage.removeItem("totalMarks");
      localStorage.removeItem("timer");
    } catch (err) {
      console.log(err);
    }
    viewResults4Client(dispatch);
    handleClick(testid);
  }, []);

  const handleClick = (testid, submitID) => {
    localStorage.setItem("testid", testid);
    localStorage.setItem("submitID", submitID);
  };

  if (user === "undefined" || user === null || user.length === 0) return <Redirect to="/stud-dashboard" />;

  return (
    <>
      <Nav />
      {loading ? (
        <div className="container">
          <Skeleton variant="rect" height={50} />
          <br />
          <Skeleton variant="rect" height={295} />
        </div>
      ) : (
        <div className="container ">
          <History history={""} />
          <div className="card mt-5 text-center">
            <div className="row">
              <h3 className="col-sm-10 text-left">Result</h3>
              <Button className="col-sm-2">
                <CSVLink
                  className=" text-left text-decoration-none "
                  data={submission.map(({ result, testname, total }) => ({
                    Test_Name: testname,
                    Total_Marks: total,
                    Marks_Achieved: result,
                    // Start_Time: startTestTime,
                    // End_Time: endTestTime
                  }))}
                >
                  Download Result
                </CSVLink>
              </Button>
            </div>
            <table className="table table-hover card-body">
              <thead className="table-primary">
                <tr>
                  <th scope="col">Test Name</th>
                  <th scope="col">Total Marks</th>
                  <th scope="col">Marks Achieved</th>
                  <th scope="col">Submission</th>
                </tr>
              </thead>
              <tbody>
                {results.map(
                  ({
                    result,
                    submissionID,
                    testname,
                    total,
                    testid,
                    startTestTime,
                    endTestTime,
                  }) => (
                    <tr key={submissionID}>
                      <th scope="row">{testname}</th>
                      <td>{total}</td>
                      <td>{result}</td>
                      <td>
                        <Link to="/submission">
                          <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={() => handleClick(testid, submissionID)}
                          >
                            View
                          </Button>
                        </Link>
                        {new Date(current) >= new Date(endTestTime) ? (
                          <Link to="/submission">
                            <Button
                              variant="contained"
                              color="primary"
                              fullWidth
                              onClick={() => handleClick(testid)}
                            >
                              View
                            </Button>
                          </Link>
                        ) : (
                          <Link to="/your-results">
                            <Button
                              variant="contained"
                              color="primary"
                              fullWidth
                              
                            >
                              OnGoing
                            </Button>
                          </Link>
                        )}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};
export default YourResults;
