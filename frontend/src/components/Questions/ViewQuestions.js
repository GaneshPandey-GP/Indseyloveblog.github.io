import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { useAuthState, viewQuestions } from "../../context";
import { NavLoading } from "../Loading";
import { Card, CardActions, CardContent, Divider } from "@material-ui/core";
import UpdateQn, { UpdateQn2 } from "./UpdateQn";
import SimpleNav from "../SimpleNav";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function ViewQuestions() {
  const [testname, setTestname] = useState(localStorage.getItem("testname"));
  const [{ questions }, dispatch] = useAuthState();

  useEffect(() => {
    viewQuestions(dispatch, localStorage.getItem("testid"));
  }, [dispatch]);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <SimpleNav heading={`Questions of ${testname}`} />
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
                        <Typography >
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
