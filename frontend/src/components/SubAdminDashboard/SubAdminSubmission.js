import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useAuthState } from "../../context";
import Skeleton from "@material-ui/lab/Skeleton";
import { Link } from "react-router-dom";
import { viewSubmissions } from "../../context";
import clsx from "clsx";
import Button from "@material-ui/core/Button";
import LDrawer from "./LDrawer";
import { CSVLink, CSVDownload } from "react-csv";
import History from "../History";
import SimpleNav from "../SimpleNav";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  header: {
    fontWeight: "bold",
  },
  link: {
    textDecoration: "none",
  }
}));

export default function Submission() {
  const [{ submission, loading }, dispatch] = useAuthState();
  useEffect(() => {

    viewSubmissions(dispatch);
  }, []);
  const classes = useStyles();
  console.log("result",submission)
 
  const clickHandler = (testid, testname) => {
    localStorage.setItem("testid", testid);
    localStorage.setItem("testname", testname);
  };

  return (
    <>
      <SimpleNav heading={"Submissions"} />
      {loading?( <div className="container mt-5"><Skeleton variant="rect" height={50}/><br/><Skeleton variant="rect" height={320} /></div>):
          (<div className="container">
            <div className="mt-4"><History history={""} /></div>
            <div className="card mt-4 text-center">
              <div className="row">
                <h3 className="col-sm-10 text-left">Result</h3>
               <Button className="col-sm-2"><CSVLink className=" text-left text-decoration-none " data={submission.map( ({  fname, lname, contact, email, result, submissionID, testname, total, testid, userid }) => ({  First_name: fname, Last_name: lname, Contact: contact, Email: email, Student_Id:userid,Test_Name: testname,Total_Marks:total,Marks_Achieved:result}))}>Download Result</CSVLink> </Button>
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
                  {submission.map(
                    ({ result, submissionID, testname, total, testid, userid }) => (
                      <tr key={submissionID}>
                        <th scope="row">{userid}</th>
                        <th >{testname}</th>
                        <td>{total}</td>
                        <td>{result}</td>
                        <td>
                          <Link to="/submission">
                            <Button
                              variant="contained"
                              color="primary"
                              fullWidth
                              onClick={() => clickHandler(testid,testname)}
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
          </div>)}
    </>
  );
}
