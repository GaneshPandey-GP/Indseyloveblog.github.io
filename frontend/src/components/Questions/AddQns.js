import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
// import { makeStyles } from '@material-ui/core/styles';
import { useLocation } from "react-router-dom";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { addQuestion, addQuestion2, useAuthState } from "../../context";
import AddCircleIcon from "@material-ui/icons/AddCircle";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddQns(props) {
  const testid = localStorage.getItem('testid');
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [correctAns, setCorrectAns] = useState("");
  const [valueError, setValueError] = React.useState("");
  const [{ loading }, dispatch] = useAuthState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };
  const [qnData, setQnData] = useState({
    question: "",
    marks: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
  });
  const [qnData2, setQnData2] = useState({
    question2: "",
    marks2: "",
  });

  const { question, marks, optionA, optionB, optionC, optionD } = qnData;

  const { question2, marks2 } = qnData2;

  const handleInputChange = (e) =>
    setQnData({ ...qnData, [e.target.name]: e.target.value });
  const handleInputChange2 = (e) =>
    setQnData2({ ...qnData2, [e.target.name]: e.target.value });
  const handleChange = (event) => {
    setCorrectAns(event.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (
      question === "" ||
      optionA === "" ||
      optionB === "" ||
      optionC === "" ||
      optionD === "" ||
      marks === "" || 
      marks <= 0
    )
      setValueError("Enter valid values!");
    else {
      setValueError("");
      addQuestion(
        dispatch,
        testid,
        question,
        optionA,
        optionB,
        optionC,
        optionD,
        correctAns,
        marks
      );
      handleClose();
    }
  };

  const handleFormSubmit2 = (e) => {
    e.preventDefault();
    if (question2 === "" || marks2 <= 0 || marks2 === "") setValueError("Enter valid values!");
    else {
      setValueError("");
      addQuestion2(dispatch, testid, question2, marks2);
      handleClose2();
    }
  };

  return (
    <div className="d-flex justify-content-around mt-5 mb-5">
      <Button
        onClick={handleClickOpen}
        variant="contained"
        color="primary"
        startIcon={<AddCircleIcon />}
      >
        Add MCQ Question
      </Button>
      <Button
        onClick={handleClickOpen2}
        variant="contained"
        color="primary"
        startIcon={<AddCircleIcon />}
      >
        Add Descriptive Question
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Add new Question"}</DialogTitle>
        <DialogContent>
          <form autoComplete="off" id="addQuestion" onSubmit={handleFormSubmit}>
            {/* <input type="file" onChange={fileChangedHandler} /> */}
            <TextField
              required
              id="question"
              label="Question"
              name="question"
              fullWidth
              type="text"
              variant="outlined"
              className="mt-3 "
              value={question}
              onChange={(e) => handleInputChange(e)}
            />
            <div className="ml-5 mr-5">
              <TextField
                required
                id="marks"
                label="Marks"
                name="marks"
                fullWidth
                type="number"
                variant="outlined"
                className="mt-3 "
                value={marks}
                onChange={(e) => handleInputChange(e)}
              />
              <TextField
                id="answer_optionA"
                label="optionA"
                name="optionA"
                fullWidth
                type="text"
                className="mt-2 mb-2"
                value={optionA}
                onChange={(e) => handleInputChange(e)}
              />
              <TextField
                id="answer_optionB"
                label="optionB"
                name="optionB"
                fullWidth
                type="text"
                className="mt-2 mb-2"
                value={optionB}
                onChange={(e) => handleInputChange(e)}
              />
              <TextField
                id="answer_optionC"
                label="optionC"
                name="optionC"
                fullWidth
                type="text"
                className="mt-2 mb-2"
                value={optionC}
                onChange={(e) => handleInputChange(e)}
              />
              <TextField
                id="answer_optionD"
                label="optionD"
                name="optionD"
                fullWidth
                type="text"
                className="mt-2 mb-2"
                value={optionD}
                onChange={(e) => handleInputChange(e)}
              />
              <FormControl className="container mt-4 mb-4">
                <InputLabel>CorrectAns</InputLabel>
                <Select
                  id="select-option"
                  value={correctAns}
                  onChange={handleChange}
                >
                  <MenuItem value="a">a</MenuItem>
                  <MenuItem value="b">b</MenuItem>
                  <MenuItem value="c">c</MenuItem>
                  <MenuItem value="d">d</MenuItem>
                </Select>
              </FormControl>
            </div>
          </form>
        </DialogContent>
        {valueError ? (
          <p className="text-small text-danger ml-4">{valueError}</p>
        ) : (
          <p></p>
        )}
        <DialogActions>
          <Button onClick={handleFormSubmit} color="primary" form="addQuestion">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={open2}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose2}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Add new Question"}</DialogTitle>
        <DialogContent>
          <form
            autoComplete="off"
            id="addQuestion2"
            onSubmit={handleFormSubmit2}
          >
            <TextField
              required
              id="question2"
              label="Question2"
              name="question2"
              fullWidth
              type="text"
              variant="outlined"
              className="mt-3 "
              value={question2}
              onChange={(e) => handleInputChange2(e)}
            />
            <TextField
              required
              id="marks2"
              label="Marks2"
              name="marks2"
              type="number"
              variant="outlined"
              className="mt-3 "
              value={marks2}
              onChange={(e) => handleInputChange2(e)}
            />
          </form>
        </DialogContent>
        {valueError ? (
          <p className="text-small text-danger ml-4">{valueError}</p>
        ) : (
          <p></p>
        )}
        <DialogActions>
          <Button
            onClick={handleFormSubmit2}
            color="primary"
            form="addQuestion2"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
