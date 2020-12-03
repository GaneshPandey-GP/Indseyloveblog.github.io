import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { useAuthState, viewQuestions } from "../../context";
import { NavLoading } from "../Loading";
import { useLocation } from "react-router-dom";
import { Card, CardActions, CardContent, Divider } from "@material-ui/core";
import UpdateQn, { UpdateQn2 } from "./UpdateQn";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function ViewQuestions() {
  let data = useLocation();
  const itestid = data.testid;
  const itestname = data.testname;
  const [testid, setTestid] = useState(itestid);
  const [testname, setTestname] = useState(itestname);
  const [{ loading, questions }, dispatch] = useAuthState();

  useEffect(() => {
    viewQuestions(dispatch, testid);
  }, [dispatch, testid]);
  console.log(questions);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit">
            Questions of "{testname}"
          </Typography>
        </Toolbar>
        {loading ? <NavLoading /> : <></>}
      </AppBar>
      <Grid container spacing={3}>
        {questions.map(
          (
            {
              question,
              qid,
              type,
              optionA,
              optionB,
              optionC,
              optionD,
              correctAns,
              marks,
            },
            index
          ) => (
            <Grid item xs={12} key={qid}>
              <Card className="mt-3 ml-4 mr-4">
                {type === 1 ? (
                  <>
                    <CardContent>
                      <Typography
                        variant="h5"
                        component="h2"
                        className="p-3 bg-dark text-white"
                      >
                        Qno.{index + 1} {question}
                      </Typography>
                      <Typography
                        color="textSecondary"
                        variant="h6"
                        className="ml-4"
                      >
                        Marks: {marks}
                      </Typography>
                      <Divider />
                      <div className="container mt-3">
                        <Typography component="p">(a) {optionA}</Typography>
                        <Typography component="p">(b) {optionB}</Typography>
                        <Typography component="p">(c) {optionC}</Typography>
                        <Typography component="p">(d) {optionD}</Typography>
                        <Typography color="textSecondary">
                          Ans: {correctAns}
                        </Typography>
                      </div>
                      <CardActions className="float-right mr-3 mb-3">
                        <UpdateQn
                          iquestion={question}
                          ioptionA={optionA}
                          ioptionB={optionB}
                          ioptionC={optionC}
                          ioptionD={optionD}
                          icorrectAns={correctAns}
                          qid={qid}
                          imarks={marks}
                        />
                      </CardActions>
                    </CardContent>
                  </>
                ) : (
                  <>
                    <CardContent>
                      <Typography
                        variant="h5"
                        component="h2"
                        className="p-3 bg-dark text-white"
                      >
                        Qno.{index + 1} {question}
                      </Typography>
                      <Typography
                        color="textSecondary"
                        variant="h6"
                        className="ml-4 mt-2"
                      >
                        Marks: {marks}
                      </Typography>
                    </CardContent>
                    <CardActions className="float-right mr-3 mb-3">
                      <UpdateQn2
                        iquestion={question}
                        qid={qid}
                        imarks={marks}
                      />
                    </CardActions>
                  </>
                )}
              </Card>
            </Grid>
          )
        )}
      </Grid>
    </div>
  );
}
