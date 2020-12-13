import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useAuthState, viewQuestions } from "../../context";
import Skeleton from "@material-ui/lab/Skeleton";
import { Card, CardActions, CardContent, Divider } from "@material-ui/core";
import UpdateQn, { UpdateQn2 } from "./UpdateQn";
import SimpleNav from "../SimpleNav";
import History from "../History";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColoe: "#ffff",
  },
  card: {
    boxShadow: "3px 8px 8px #a3b1c4",
    margin: "3px 0 4px 4px"
  },
}));

export default function ViewQuestions() {
  const initial = localStorage.getItem("testname")
  const [testname, setTestname] = useState(initial);
  const [load, setLoad] = useState(true);

  const [{ questions, loading }, dispatch] = useAuthState();

  useEffect(() => {
    viewQuestions(dispatch, localStorage.getItem("testid"));
  }, [dispatch]);
  const classes = useStyles();

  return (
    <div className={classes.root}>

          <SimpleNav heading={`Questions of ${testname}`} />
        {loading & load? (
        <>  
          <div className="container mt-5">
            <div className="mt-2">
              <Skeleton variant="rect" height={65} />
              <br />
              <Skeleton variant="rect" height={165} />
            </div>
            <br />
            <div className="mt-2">
              <Skeleton variant="rect" height={65} />
              <br />
              <Skeleton variant="rect" height={165} />
            </div>
            <br />
            <div className="mt-2">
              <Skeleton variant="rect" height={65} />
              <br />
              <Skeleton variant="rect" height={165} />
            </div>
            <br />
          </div>
        </>
      ) : (
        <Grid container spacing={3}>
          <div className="ml-5 mt-5">
            <History history={testname} />
          </div>

          {questions.length === 0 ? (
            <h2 className="col-sm-12 text-center text-secondary border border-info p-3 ">
              No Questions!
            </h2>
          ) : (
            <>
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
                    <Card className={classes.card}>
                      {type === 1 ? (
                        <>
                          <CardContent>
                            <Typography
                              variant="h5"
                              component="h2"
                              className="p-3 bg-dark text-white"
                            >
                              {index + 1}. {question}
                            </Typography>
                            <Typography variant="h6" className="ml-4">
                              Marks: {marks}
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
                              <Typography>Ans: {correctAns}</Typography>
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
                                setLoad = {setLoad}
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
                              {index + 1}. {question}
                            </Typography>
                            <Typography variant="h6" className="ml-4 mt-2">
                              Marks: {marks}
                            </Typography>
                          </CardContent>
                          <CardActions className="float-right mr-3 mb-3">
                            <UpdateQn2
                              iquestion={question}
                              qid={qid}
                              imarks={marks}
                              setLoad = {setLoad}
                            />
                          </CardActions>
                        </>
                      )}
                    </Card>
                  </Grid>
                )
              )}
            </>
          )}
        </Grid>
      )}
    </div>
  );
}
