import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { createSubmission, useAuthState, viewQuestions4Client } from "../../context";
import PublishIcon from '@material-ui/icons/Publish';
import Timer from './Timer';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1, 1, 0, 0),
  },
}));

function Questions() {
  const classes = useStyles();
  const [{ questions, loading }, dispatch] = useAuthState();
  const [selected, setSelected] = React.useState([]);
  const [helperText, setHelperText] = React.useState("Choose wisely");
  const testid = parseInt(localStorage.getItem("testid"))

  useEffect(() => {
    viewQuestions4Client(dispatch, testid )
  },[dispatch, testid])
  console.log(questions);

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
    createSubmission(dispatch, testid, result, answers )
  }

  return (
    <>
    <div>
    {loading ?<p></p> : <Timer/>}
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
          <Button
            variant="contained"
            color="primary"
            size="large"
            className=""
            startIcon={<PublishIcon />}
            onClick={handleSubmit}
          >
        Submit
        </Button>
        </div>
      </form>
    </div>
    </>
  );
}

export default Questions;
