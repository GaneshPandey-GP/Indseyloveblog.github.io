import React, {useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
// import { makeStyles } from '@material-ui/core/styles';
import {useLocation} from "react-router-dom";
import { Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField } from "@material-ui/core";
import { addQuestion, useAuthState } from '../../context';
// import axios from "axios";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function AddQns(props) {
  let data = useLocation();
  const testid = data.testid
  const [open, setOpen] = React.useState(false);
  const [correctAns, setCorrectAns] = useState('')
  const [valueError, setValueError] = React.useState('')
  const [{loading}, dispatch] = useAuthState()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }
  const [qnData, setQnData] = useState({
    question: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: ""
  });
  // const [pic, setPic] = useState(null);
  const {
    question,
    optionA,
    optionB,
    optionC,
    optionD,
  } = qnData;

  // const fileChangedHandler = (event) => {
  //   setPic(event.target.files[0]);
  // };

  const handleInputChange = (e) => setQnData({ ...qnData, [e.target.name]: e.target.value });
  const handleChange = (event) => {
    setCorrectAns(event.target.value);
  }
  // console.log(data.testid)
  const handleFormSubmit = (e) => {
    // const file = new FormData();
    // file.append("myFile", pic, pic.name);
    // const formData = {
    //   // file,
    //   question,
    //   optionA,
    //   optionB,
    //   optionC,
    //   optionD,
    //
    // }
    // axios.post("api/", formData, {
    //   onUploadProgress: (progressEvent) => {
    //     console.log(progressEvent.loaded / progressEvent.total);
    //   },
    // });
    e.preventDefault()
    // console.log("submitted")
    if ( question === '' || optionA === '' || optionB === '' || optionC === '' || optionD === '') 
      setValueError("Enter all the values!")
      else {
        setValueError("")
        addQuestion(dispatch, testid, question, optionA, optionB, optionC, optionD, correctAns)
        handleClose()
      }      
  }

  // const classes = useStyles()
  return (
    <div className="d-flex justify-content-center mt-5">
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add Question
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
          <form  autoComplete="off" id="addQuestion" onSubmit={handleFormSubmit}>
            {/* <input type="file" onChange={fileChangedHandler} /> */}
            <FormControl>
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
              </FormControl>
            <div className="ml-5 mr-5">
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
        {valueError ? <p className="text-small text-danger ml-4">{valueError}</p>: <p></p>}
        <DialogActions>
          <Button onClick={handleFormSubmit} color="primary" form="addQuestion">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


