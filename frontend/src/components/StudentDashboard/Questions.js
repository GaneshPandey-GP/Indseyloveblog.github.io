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
  const [answers, setAnswers] = useState([{qid: '', ans: ''}])
  const [selected, setSelected] = React.useState([]);
  const [helperText, setHelperText] = React.useState("Choose wisely");
  useEffect(() => {
    viewQuestions4Client(dispatch, parseInt(localStorage.getItem("testid")) )
  },[])
  console.log(questions);


  const handleRadioChange = (e, qid) => {
    setSelected((selected) => [...selected, e.target.value])
    setAnswers((answers) => [...answers, {qid: qid, ans: selected}]);
    console.log(selected)
    setHelperText(" ");
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log(value)
    // createSubmission(dispatch, )
  };
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
            correctAns,
            qid,
          }, index) => (
            <div className="card mt-3 rounded-lg shadow-lg" key={qid}>
              <div className="card-header">
               <h4> QNo.{index+1} {question}</h4>
              </div>
              <div className="card-body">
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
                        value={optionA}
                        control={<Radio />}
                        label={optionA}
                      />
                      <FormControlLabel
                        value={optionB}
                        control={<Radio />}
                        label={optionB}
                      />
                      <FormControlLabel
                        value={optionC}
                        control={<Radio />}
                        label={optionC}
                      />
                      <FormControlLabel
                        value={optionD}
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
