import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { createSubmission, useAuthState } from "../../context";
import PublishIcon from '@material-ui/icons/Publish';

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
  const [{ questions }, dispatch] = useAuthState();
  const [answers, setAnswers] = useState([{qid: '', ans: ''}])
  const [value, setValue] = React.useState([]);
  const [helperText, setHelperText] = React.useState("Choose wisely");
  console.log(questions);

  const handleRadioChange = (event) => {
    setValue(event.target.value.concat(value));
    setHelperText(" ");
  };

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(value)
    // createSubmission(dispatch, )
  };
  return (
    <div>
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
                      value={value}
                      onChange={handleRadioChange}
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
  );
}

export default Questions;
