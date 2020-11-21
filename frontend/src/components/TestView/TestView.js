import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import "bootstrap/dist/css/bootstrap.min.css";

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
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState("Choose wisely");

  const handleRadioChange = (event) => {
    setValue(event.target.value);
    setHelperText(" ");
    setError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (value === "best") {
      setHelperText("You got it!");
      setError(false);
    } else if (value === "worst") {
      setHelperText("Sorry, wrong answer!");
      setError(true);
    } else {
      setHelperText("Please select an option.");
      setError(true);
    }
  };
  return (
    <div>
      <div className="container ">
        <div className="card mt-3 rounded-lg shadow-lg">
          <div className="card-header">
            <h4>Who is the CEO of Google?</h4>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <FormControl
                component="fieldset"
                error={error}
                className={classes.formControl}
              >
                <RadioGroup
                  aria-label="quiz"
                  name="quiz"
                  value={value}
                  onChange={handleRadioChange}
                >
                  <FormControlLabel
                    value="best"
                    control={<Radio />}
                    label="The best!"
                  />
                  <FormControlLabel
                    value="worst"
                    control={<Radio />}
                    label="The worst."
                  />
                  <FormControlLabel
                    value="worst"
                    control={<Radio />}
                    label="The worst."
                  />
                  <FormControlLabel
                    value="worst"
                    control={<Radio />}
                    label="The worst."
                  />
                </RadioGroup>
                <FormHelperText>{helperText}</FormHelperText>
                <Button
                  type="submit"
                  variant="outlined"
                  color="primary"
                  className={classes.button}
                >
                  Check Answer
                </Button>
              </FormControl>
            </form>
          </div>
        </div>
      </div>
    </div>
	
  );
}

export default TestView;
