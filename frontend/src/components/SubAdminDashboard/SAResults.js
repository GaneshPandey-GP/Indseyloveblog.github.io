import React, { useEffect } from "react";
import { useAuthState, viewResults } from "../../context";
import Skeleton from "@material-ui/lab/Skeleton";
import { Link, Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { CSVLink } from "react-csv";
import History from "../History";
import SimpleNav from "../SimpleNav";


export default function SAResults() {
  const testid = localStorage.getItem("testid")
  const [{ results, loading }, dispatch] = useAuthState();
  useEffect(() => {
    viewResults(dispatch, testid);
  }, [dispatch]);

  const clickHandler = (testid, submitID) => {
    localStorage.setItem("testid", testid)
    localStorage.setItem("submitID", submitID);
  };

  if(testid === null || testid === 'undefined') return <Redirect to="/sub-admin-dashboard" />
  return (
    <>
      <SimpleNav heading={"Results"} />
      {loading ? (
        <div className="container mt-5">
          <Skeleton variant="rect" height={50} />
          <br />
          <Skeleton variant="rect" height={320} />
        </div>
      ) : (
        <div className="container">
          <div className="mt-4">
            <History history={""} />
          </div>
          {results.filter((result) => result.isActive === 1).length === 0 ? (
            <h2 className="col-sm-12 text-center text-secondary border border-info p-3 mt-4">
              No Submissions Available!
            </h2>
          ) : (
            <div className="card mt-4 text-center">
              <div className="row">
                <h3 className="col-sm-10 text-left">Result</h3>
                <Button className="col-sm-2">
                  <CSVLink
                    className=" text-left text-decoration-none "
                    data={results.map(
                      ({
                        fname,
                        lname,
                        contact,
                        email,
                        result,
                        submissionID,
                        testname,
                        total,
                        testid,
                        userid,
                      }) => ({
                        First_name: fname,
                        Last_name: lname,
                        Contact: contact,
                        Email: email,
                        Student_Id: userid,
                        Test_Name: testname,
                        Total_Marks: total,
                        Marks_Achieved: result,
                      })
                    )}
                  >
                    Download Result
                  </CSVLink>{" "}
                </Button>
              </div>
              <table className="table table-hover card-body">
                <thead className="table-primary">
                  <tr>
                    <th scope="col">Student Id</th>
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
                      userid,
                    }) => (
                      <tr key={submissionID}>
                        <th scope="row">{userid}</th>
                        <th>{testname}</th>
                        <td>{total}</td>
                        <td>{result}</td>
                        <td>
                          <Link to="/view-submission">
                            <Button
                              variant="contained"
                              color="primary"
                              fullWidth
                              onClick={() => clickHandler(testid, submissionID)}
                            >
                              View
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </>
  );
}
