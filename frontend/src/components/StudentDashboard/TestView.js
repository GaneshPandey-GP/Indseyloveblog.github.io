import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  createSubmission,
  getSections,
  useAuthState,
  viewQuestions4Client,
  getSections4Client
} from "../../context";
import Timer from "./Timer";
import TestRedirect from "./TestRedirect";
import SimpleNav from "../SimpleNav";
import { Redirect } from "react-router-dom";
import Skeleton from "@material-ui/lab/Skeleton";
import TimesUp from './TimesUp';

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
  const [{ questions, loading, sections }, dispatch] = useAuthState();
  const [selected, setSelected] = React.useState([]);
  const [helperText, setHelperText] = React.useState("Choose wisely");
  const [error, setError] = useState(false);
  const testid = localStorage.getItem("testid");
  const total = localStorage.getItem("totalMarks");
  const timer = localStorage.getItem("timer");
  const testname = localStorage.getItem("testname");
  const startTestTime = localStorage.getItem("startTestTime");
  const endTestTime = localStorage.getItem("endTestTime");
  const [minutes, setMinutes] = useState(parseInt(localStorage.getItem("min")));
  const [seconds, setSeconds] = useState(parseInt(localStorage.getItem("sec")));
  useEffect(() => {
    if (
      testid === "undefined" ||
      total === "undefined" ||
      testname === "undefined" ||
      timer === "undefined"
    )
      setError(true);
    viewQuestions4Client(dispatch, testid);
    getSections4Client(dispatch, testid)
   
  
  }, [testid, testname]);

  useEffect(() => {
    try {
      var testsGiven = JSON.parse(localStorage.getItem("testsGiven"));
      if (testid !== NaN || testid !== null) testsGiven.push(parseInt(testid))
      let testSet = new Set(testsGiven)
      testsGiven = Array.from(testSet)
      localStorage.setItem("testsGiven", JSON.stringify(testsGiven));
    } catch (err) {
      console.log(err);
    }
  }, [testid]);

  const selector = React.useCallback(
    (key, ans, section) =>
      setSelected((selected) => ({
        ...selected,
        [key]: {
          ...selected[key],
          qid: key,
          ans,
          section
        },
      })),
    []
  );

  const answers = Object.assign(
    {},
    ...questions.map((x) => ({ [x.qid]: x.correctAns }))
  )

  const marks = Object.assign(
    {},
    ...questions.map((x) => ({ [x.qid]: x.marks }))
  )

  const getMarks = () => {
    let totalmarks = 0;
    for (let i in selected) {
      if (selected[i].ans === answers[i]) {
        totalmarks = totalmarks + marks[i]
      }
    }
    return totalmarks;
  }

  const sectionMarks = (sec) => {
    let sectionMarks = 0
    for (let i in selected) {
      if (selected[i].section === sec) {
        if (selected[i].ans === answers[i]) {
          sectionMarks = sectionMarks + marks[i];
        }
      }
    }
    return (sectionMarks)
  }
  


const getTotalSecMark = (section) => {
  const quesBySec = questions.filter(sec => sec.section === section)
  var totalSecMarks = 0
  for (let i in quesBySec) {
    totalSecMarks += quesBySec[i].marks
  }
  return(totalSecMarks)
}

  const handleRadioChange = (e, qid, section) => {
    const data = e.target.value;
    selector(qid, data, section);
    setHelperText(" ");
  }

const handleSubmit = (e) => {
  const sectionWise = []
  const result = getMarks();
  const answers = Object.values(selected);
  const secs = sections.filter(sec => sec.isActive === 1)
  for ( let i in secs) {
    const sectionTotal = getTotalSecMark(secs[i].section)
    const achieved = sectionMarks(secs[i].section)
    sectionWise.push({"section": secs[i].section, "sectionTotal": sectionTotal, "marksAchieved": achieved})
  }
  e.preventDefault();
  if (!error) createSubmission(dispatch, testid, result, answers, startTestTime, endTestTime, sectionWise );
}


  useEffect(() => {
    if (!seconds) return;
    const intervelID = setInterval(() => {
      setSeconds(parseInt(localStorage.getItem("sec")));
      setMinutes(parseInt(localStorage.getItem("min")));
    }, 1000);

    return () => {
    
      clearInterval(intervelID);
    };
  }, [seconds]);
  
  if (error) return <Redirect to="/subject-test-view" />;
  
  return (
    <div>
      {loading ? (
        <>
          <SimpleNav heading={"Attempt all the questions:"}  />
        
          <div className="container mt-5">
            <Skeleton variant="rect" height={90} />
            <br />
            <Skeleton variant="rect" height={165} />
            <Skeleton variant="rect" height={165} />
            <Skeleton variant="rect" height={50} />
            <br />
            <Skeleton variant="rect" height={165} />
            <Skeleton variant="rect" height={165} />
          </div>
        </>
      ) : (
        <>
        {(minutes===0 && seconds===0)? <> <TimesUp handleSubmit={handleSubmit}/></>: (
          <>
          <SimpleNav heading={"Attempt all the questions:"} />
          <Timer/>
          <form className="container " id="form" onSubmit={handleSubmit}>  
            {questions.map(
              (
                { question, optionA, optionB, optionC, optionD, qid, marks, isActive, section }, index
              ) => (
                
                isActive ===1 ?
                <div className="card mt-3 rounded-lg shadow-lg" key={qid}>
                  <div className="card-header">
                    <h4>
                     
                      QNo.{index + 1} {question} 
                 
                    </h4>
                  </div>
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <p>{marks} marks</p>
                      <p>{section})</p>
                    </div>
                    <FormControl
                      component="fieldset"
                      className={classes.formControl}
                    >
                      <RadioGroup
                        aria-label="quiz"
                        name="quiz"
                        value={selected[index]}
                        onChange={(e) => handleRadioChange(e, qid, section)}
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
                    {/* <div style={{visibility: "hidden"}}>{sectionDetails.push({"sectionName":section ,"total":getSectionTotalMarks({section}), "achived":getSectionAchivedMarks()})}</div> */}
                  </div>
                </div>
                :
                null
              )
            )}
            <div className="d-flex justify-content-center mt-5 mb-3">
              <TestRedirect handleSubmit={handleSubmit} endTestTime ={endTestTime} />
            </div>
          </form>
          </>
          )}
        </>
      )}
      
    </div>
  );
}

export default TestView;
