import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Skeleton from '@material-ui/lab/Skeleton';
import {
  useAuthState,
  viewQuestions,
  viewQuestions4Client,
  viewSubmission,
} from "../../context";
import Timer from "./Timer";
import TestRedirect from "./TestRedirect";
import SimpleNav from "../SimpleNav";
import History from "../History";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1, 1, 0, 0),
  },
}));

function Submission() {
  const classes = useStyles();
  const [{ submission, questions, loading }, dispatch] = useAuthState();
  const  testid = localStorage.getItem("testid")
  let yourSoln = [];
  let result = [];

  useEffect(() => {
    viewSubmission(dispatch, testid);
    viewQuestions4Client(dispatch, testid)
  }, []);

  submission.map((ques) => yourSoln.push(ques.answers))

  try{
    result = questions.map((item) => {
    const value = yourSoln[0].find(({ qid }) => qid === item.qid)
    const ans = value.ans;
    return { ...item, ans };
  });
  }catch(err){
    console.log(err)
  }


  console.log(submission);

  return (
    <div>
      {loading ? (
        <><SimpleNav heading={"Attempt all the questions:"} /><div className="container mt-5"><Skeleton variant="rect" height={90}/><br/><Skeleton variant="rect" height={165} /><Skeleton variant="rect" height={165} /><Skeleton variant="rect" height={50}/><br/><Skeleton variant="rect" height={165} /><Skeleton variant="rect" height={165} /></div></>
      ) : (
        <>
          <SimpleNav heading={"Your Submission"} />
          <div className="container">
            {submission[0] ? (
              <div className="card-header text-center font-weight-bold mt-3 mb-3">
                <p>Total Marks: {submission[0].total}</p>
                <p>Marks Obtained: {submission[0].result}</p>
              </div>
            ) : (
              <div></div>
            )}
            <History history={""} />

            {result.map(
              (
                {
                  qid,
                  question,
                  marks,
                  ans,
                  optionA,
                  optionB,
                  optionC,
                  optionD,
                  correctAns,
                },
                index
              ) => (
                <div className="card mt-3 rounded-lg shadow-lg mb-2" key={qid}>
                  <div className="card-header">
                    <h4>
                      {" "}
                      QNo.{index + 1} {question}
                    </h4>
                  </div>
                  <div className="card-body">
                    <p className="float-right">{marks} marks</p>
                    <FormControl
                      component="fieldset"
                      className={classes.formControl}
                    >
                      <RadioGroup aria-label="quiz" name="quiz" value={ans}>
                        <FormControlLabel
                          value="a"
                          control={<Radio />}
                          label={optionA}
                        />
                        <FormControlLabel
                          value="b"
                          control={<Radio />}
                          label={optionB}
                        />
                        <FormControlLabel
                          value="c"
                          control={<Radio />}
                          label={optionC}
                        />
                        <FormControlLabel
                          value="d"
                          control={<Radio />}
                          label={optionD}
                        />
                        {/* {ans === correctAns ? setHelperText("incorrect!") : setHelperText("")} */}
                        {ans === correctAns ? (
                          <FormHelperText className="text-success">
                            Correct!
                          </FormHelperText>
                        ) : (
                          <>
                            <FormHelperText className="text-danger font-italic">
                              Incorrect!
                            </FormHelperText>{" "}
                            <p className="font-weight-bold">
                              Correct ans is ({correctAns}).
                            </p>
                          </>
                        )}
                      </RadioGroup>
                    </FormControl>
                  </div>
                </div>
              )
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Submission;
