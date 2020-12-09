import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import Nav from "./Nav";
import { useAuthState, viewResults } from "../../context";
import { viewSubmission } from "../../context";
import { Link } from "react-router-dom";
import { CSVLink } from "react-csv";
const Results = () => {
  const [{ results, submission, loading }, dispatch] = useAuthState();

  useEffect((testid, submissionID) => {
    try {
      localStorage.removeItem("testid");
      localStorage.removeItem("testtime");
      localStorage.removeItem("testname");
      localStorage.removeItem("totalMarks");
      localStorage.removeItem("timer");
    } catch (err) {
      console.log(err);
    }
    viewResults(dispatch);
    handleClick(testid);
    viewSubmission(dispatch);
  }, []);

  const handleClick = (testid) => {
    localStorage.setItem("testid", testid);
  };
  console.log(results);
  return (
    <>
      <Nav />
      <div className="container text-center ">
        <div className="card mt-5">
          <div className="row">
            <h3 className="col-sm-10 text-left">Result</h3>
            <Button className="col-sm-2">
              <CSVLink
                className=" text-left text-decoration-none "
                data={submission.map(
                  ({
                    result,
                    testname,
                    total,
                  }) => ({
                    Test_Name: testname,
                    Total_Marks: total,
                    Marks_Achieved: result,
                  })
                )}
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
                ({ result, submissionID, testname, total, testid }) => (
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
                          onClick={() => handleClick(testid)}
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
      </div>
    </>
  );
};
export default Results;

//testname totalmarks marksachieved viewsubmission
