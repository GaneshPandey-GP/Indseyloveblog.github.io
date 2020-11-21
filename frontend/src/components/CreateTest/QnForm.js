import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
// import Fab from "@material-ui/core/Fab";
// import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import { Button, Paper, TextField } from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 7,
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: "10px 10px",
    margin: "20px 0",
  },
  answer: {
    display: "grid",
    justifyContent: "center",
  },
  option: {
    margin: "10px 0",
    width: "40ch",
  },
  question: {
    margin: "16px 0",
  },
}));

export default function QnForm() {
  const [qnData, setQnData] = useState({
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    correct_answer: "",
  });
  const [pic, setPic] = useState(null);
  const {
    question,
    option1,
    option2,
    option3,
    option4,
    correct_answer,
  } = qnData;

  const fileChangedHandler = (event) => {
    setPic(event.target.files[0]);
  };

  const handleInputChange = (e) => setQnData({ ...qnData, [e.target.name]: e.target.value });

  const handleFormSubmit = () => {
    const file = new FormData();
    file.append("myFile", pic, pic.name);
    const formData = {
      file,
      question,
      option1,
      option2,
      option3,
      option4,
      correct_answer,
    }
    axios.post("api/", formData, {
      onUploadProgress: (progressEvent) => {
        console.log(progressEvent.loaded / progressEvent.total);
      },
    });
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper elevation={2} className={classes.paper}>
        <form noValidate autoComplete="off">
          {/* <Fab color="primary" aria-label="add"> */}
          <input type="file" onChange={fileChangedHandler} />
          {/* </Fab> */}

          <TextField
            id="question"
            label="Question"
            fullWidth
            variant="outlined"
            className={classes.question}
          />
          <div className={classes.answer}>
            <TextField
              id="answer_option1"
              label="option1"
              className={classes.question}
              onChange={(e) => handleInputChange(e)}
            />
            <TextField
              id="answer_option2"
              label="option2"
              className={classes.option}
              onChange={(e) => handleInputChange(e)}
            />
            <TextField
              id="answer_option3"
              label="option3"
              className={classes.option}
              onChange={(e) => handleInputChange(e)}
            />
            <TextField
              id="answer_option4"
              label="option4"
              className={classes.option}
              onChange={(e) => handleInputChange(e)}
            />
            <TextField
              id="correct_answer"
              label="Correct answer"
              variant="outlined"
              className={classes.option}
              onChange={(e) => handleInputChange(e)}
            />

            <Button
              type="submit"
              style={{ margin: "18px 0" }}
              variant="contained"
              color="primary"
              onSubmit={handleFormSubmit}
            >
              Save
            </Button>
          </div>
        </form>
      </Paper>
    </div>
  );
}
