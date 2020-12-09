import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import "bootstrap/dist/css/bootstrap.min.css";
import { createSubmission, useAuthState, viewQuestions4Client } from "../../context";
import Timer from './Timer';
import TestRedirect from "./TestRedirect";
import SimpleNav from "../SimpleNav";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1, 1, 0, 0),
  },
}));

function TestView() {
  const classes = useStyles();
  const [{ questions, loading }, dispatch] = useAuthState()
  const [selected, setSelected] = React.useState([]);
  const [helperText, setHelperText] = React.useState("Choose wisely");
  const [error, setError] = useState(false)
  const testid = localStorage.getItem("testid")
  const total = localStorage.getItem("totalMarks")
  const timer = localStorage.getItem("timer")
  const testname = localStorage.getItem("testname")

  useEffect(() => {
    if (testid === "undefined" || total === "undefined" || testname === "undefined" || timer === "undefined") setError(true)
    viewQuestions4Client(dispatch, testid)
  },[testid, testname])

  useEffect(() => {
    var testsGiven = JSON.parse(localStorage.getItem('testsGiven'))
    console.log(testsGiven)
    testsGiven.push(parseInt(testid))
    localStorage.setItem('testsGiven', JSON.stringify(testsGiven))
  },[])

  const selector = React.useCallback(
    (key, ans) =>
      setSelected((selected) => ({
        ...selected,
        [key]: {
          ...selected[key],
          qid: key,
          ans
        },
      })),
    []
  )

  const getMarks = () => {
    let answers = Object.assign({}, ...questions.map((x) => ({[x.qid]: x.correctAns})))
    let marks = Object.assign({}, ...questions.map((x) => ({[x.qid]: x.marks})))
    let totalmarks = 0
    for (let i in selected) {
      if(selected[i].ans === answers[i]) {
        totalmarks = totalmarks + marks[i]
      }
    }
    return(totalmarks)
  }

  const handleRadioChange = (e, qid) => {
    const data = e.target.value
    selector(qid, data)
    setHelperText(" ");
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const result = getMarks()
    const answers = Object.values(selected)
    // alert("You got" + " " + result)
    if (!error) createSubmission(dispatch, testid, result, answers )
  }
  console.log(error)
  if (error) return <Redirect to="/subject-test-view" />

  return (
    <div>
    {loading ? <SimpleNav heading={"Attempt all the questions:"}/> :
    <>
      <SimpleNav heading={"Attempt all the questions:"}/>
      <Timer />
      <form className="container " onSubmit={handleSubmit}>
        {questions.map(
          ({
            question,
            optionA,
            optionB,
            optionC,
            optionD,
            qid,
            marks
          }, index) => (
            <div className="card mt-3 rounded-lg shadow-lg" key={qid}>
              <div className="card-header">
               <h4> QNo.{index+1} {question}</h4>
              </div>
              <div className="card-body">
              <p className="float-right">{marks} marks</p>
                  <FormControl
                    component="fieldset"
                    className={classes.formControl}
                  >
                    <RadioGroup
                      aria-label="quiz"
                      name="quiz"
                      value={selected[index]}
                      onChange={(e) => handleRadioChange(e, qid)}
                    >
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
                    </RadioGroup>
                    <FormHelperText>{helperText}</FormHelperText>
                  </FormControl>
              </div>
            </div>
          )
        )}
        <div className="d-flex justify-content-center mt-5 mb-3">
          <TestRedirect handleSubmit={handleSubmit}/>
        </div>
      </form>
      </>}
    </div>
  );
}

export default TestView;
