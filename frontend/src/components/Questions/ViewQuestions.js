import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useAuthState, viewQuestions } from '../../context';
import { NavLoading } from "../Loading";
import { useLocation } from 'react-router-dom';
import { Card, CardActions, CardContent, Divider } from '@material-ui/core';
import UpdateQn from './UpdateQn';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  }
}));

export default function ViewQuestions() {
  const [{loading, questions}, dispatch] = useAuthState()
  let data = useLocation();
  const testid = data.testid

  useEffect(() => {
    viewQuestions(dispatch, testid)
  }, [dispatch, testid])

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit">
            Questions of "{data.testname}"
          </Typography>
        </Toolbar>
        {loading ? <NavLoading /> : <></>}
      </AppBar>
      <Grid container spacing={3}>
      {questions.map(({question, qid, optionA, optionB, optionC, optionD, correctAns}, index) =>(
        <Grid item xs={12} key={qid}>
          <Card className="mt-3 ml-4 mr-4">
            <CardContent>
              <Typography variant="h5" component="h2" className="p-3 bg-dark text-white">
                Qno.{index+1} {question}
              </Typography>
              <Divider />
              <div className="container mt-3">
                <Typography component="p">
                (a) {optionA}
                </Typography>
                <Typography component="p">
                (b) {optionB}
                </Typography>
                <Typography component="p">
                (c) {optionC}
                </Typography>
                <Typography component="p">
                (d) {optionD}
                </Typography>
                <Typography color="textSecondary">
                  Ans: {correctAns}
                </Typography>
              </div>
            </CardContent>
            <CardActions className="float-right mr-3 mb-3">
            <UpdateQn iquestion={question} ioptionA={optionA} ioptionB={optionB} ioptionC={optionC} ioptionD={optionD} icorrectAns={correctAns} qid={qid}/>
            </CardActions>
          </Card>
        </Grid>
      ))}
      </Grid>
    </div>
  );
}


