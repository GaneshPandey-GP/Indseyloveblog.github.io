import React, {useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import {useLocation} from "react-router-dom";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@material-ui/core";
import { updateQuestion2, useAuthState } from '../../context';
import EditIcon from '@material-ui/icons/Edit';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function UpdateQn({iquestion, qid, ioptionA, ioptionB, ioptionC, ioptionD, icorrectAns, imarks, isection, isectionid, setLoad, updateQuestion}) {
  const testid = localStorage.getItem('testid')
  const [open, setOpen] = React.useState(false);
  const [correctAns, setCorrectAns] = useState(icorrectAns)
  const [section, setSection] = useState(isection)
  const [sectionId, setSectionId] = useState(isectionid)

  console.log(isection)
  const [valueError, setValueError] = React.useState('')
  const [{loading, sections}, dispatch] = useAuthState()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSectionChange = (event) => {
    setSection(event.target.value);
  }

  const handleClose = () => {
    setOpen(false);
  }
  const [qnData, setQnData] = useState({
    question: iquestion,
    marks: imarks,
    optionA: ioptionA,
    optionB: ioptionB,
    optionC: ioptionC,
    optionD: ioptionD
  });
  const {
    question,
    marks,
    optionA,
    optionB,
    optionC,
    optionD,
  } = qnData;


  const handleInputChange = (e) => setQnData({ ...qnData, [e.target.name]: e.target.value });
  const handleChange = (event) => {
    setCorrectAns(event.target.value);
  }
  const handleFormSubmit = (e) => {
    e.preventDefault()
    if ( question === '' || optionA === '' || optionB === '' || optionC === '' || optionD === '' || marks === '')
      setValueError("Enter all the values!")
      else {
        setValueError("")
        updateQuestion(dispatch, qid, question, optionA, optionB, optionC, optionD, correctAns, marks, testid, imarks, section, sectionId)
        handleClose()
        setLoad(false)
      }
  }

  return (
    <div>
      <Button
        onClick={handleClickOpen}
        variant="contained"
        startIcon={<EditIcon />}
        >
            Update
        </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Update Question"}</DialogTitle>
        <DialogContent>
          <form  autoComplete="off" id="addQuestion" onSubmit={handleFormSubmit}>
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
              <FormControl className="container mt-2 ">
                <InputLabel>Select a section</InputLabel>
                <Select
                  id="select-section"
                  value={section}
                  onChange={(e) => handleSectionChange(e)}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {sections.map(({sectionid, section}) =>
                    <MenuItem key={sectionid} value={section} onClick={ ()=> setSectionId(sectionid)}>{section}</MenuItem>
                  )}
                </Select>
              </FormControl>
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
                <InputLabel>Correct Answer</InputLabel>
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
  )
}

export const UpdateQn2 = ({iquestion, qid, imarks}) => {
    let data = useLocation();
    const testid = data.testid
    const [open, setOpen] = React.useState(false);
    const [valueError, setValueError] = React.useState('')
    const [{loading}, dispatch] = useAuthState()
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    }
    const [qnData, setQnData] = useState({
      question: iquestion,
      marks: imarks,
    });
    const {
      question,
      marks,
    } = qnData;
  
  
    const handleInputChange = (e) => setQnData({ ...qnData, [e.target.name]: e.target.value });
    const handleFormSubmit = (e) => {
      e.preventDefault()
      if ( question === '' || marks === '' || marks <= 0)
        setValueError("Enter valid values!")
        else {
          setValueError("")
          updateQuestion2(dispatch, qid, question, marks, testid)
          handleClose()
        }
    }
  return (
    <div>
      <Button
        onClick={handleClickOpen}
        variant="contained"
        startIcon={<EditIcon />}
        >
            Update
        </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Update Question"}</DialogTitle>
        <DialogContent>
          <form  autoComplete="off" id="addQuestion" onSubmit={handleFormSubmit}>
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
            </div>
          </form>
        </DialogContent>
        {valueError ? <p className="text-small text-danger ml-4">{valueError}</p>: <p></p>}
        <DialogActions>
          <Button onClick={handleFormSubmit} form="addQuestion">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
