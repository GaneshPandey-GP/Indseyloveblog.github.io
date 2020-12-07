import React from "react";
import Button from "@material-ui/core/Button";

const TestDetails = () => {
  return (
    <>
      <div className="container text-center">
        <div className="card ">
          <h1 className="card-header">Results</h1>
          <table class="table table-hover card-body">
            <thead class="table-primary">
              <tr>
                <th scope="col">Test Name</th>
                <th scope="col">Total Marks</th>
                <th scope="col">Marks Achieved</th>
                <th scope="col">View Submission</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">MCQ</th>
                <td>100</td>
                <td>90</td>
                <td>
                  <Button variant="contained" color="primary" fullWidth>
                    View
                  </Button>
                </td>
              </tr>
              <tr>
                <th scope="row">MCQ</th>
                <td>100</td>
                <td>90</td>
                <td>
                  <Button variant="contained" color="primary" fullWidth>
                    View
                  </Button>
                </td>
              </tr>
              <tr>
                <th scope="row">MCQ</th>
                <td>100</td>
                <td>90</td>
                <td>
                  <Button variant="contained" color="primary" fullWidth>
                    View
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default TestDetails;

//testname totalmarks marksachieved viewsubmission
