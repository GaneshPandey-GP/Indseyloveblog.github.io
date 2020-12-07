import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import Nav from "./Nav";
import { useAuthState, viewResults } from "../../context";

const Results = () => {
  const [{results}, dispatch] = useAuthState()
  useEffect(() => {
    try{
      localStorage.removeItem("testid")
      localStorage.removeItem("testtime")
      localStorage.removeItem("testname")
      localStorage.removeItem("totalMarks")
      localStorage.removeItem("timer")
    }catch(err){
      console.log(err)
    }
    viewResults(dispatch)
  }, [])

  console.log(results)
  return (
    <>
    <Nav />
      <div className="container text-center ">
        <div className="card mt-5">
          <h1 className="card-header">Result</h1>
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
              {results.map(({result, submissionID, testname, total}) => (<tr key={submissionID}>
                <th scope="row">{testname}</th>
                <td>{total}</td>
                <td>{result}</td>
                <td>
                  <Button variant="contained" color="primary" fullWidth>
                    View
                  </Button>
                </td>
              </tr>))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default Results;

//testname totalmarks marksachieved viewsubmission
