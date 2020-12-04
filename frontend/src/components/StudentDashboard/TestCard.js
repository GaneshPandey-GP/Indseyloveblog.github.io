import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useAuthState } from "../../context";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    boxShadow: "7px 8px 10px #5a616f",
    "&:hover": {
      boxShadow: "7px 8px 10px #000000",
    },
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 24,
    padding: theme.spacing(1),
    fontWidth: 900,
  },
  main:{
    marginTop:150,
  },
  data: {
    padding: theme.spacing(1),
    marginBottom: 12,
  },
}));
export const TestCard = () => {
  const [{ tests, loading }, dispatch] = useAuthState();
  const classes = useStyles();
  
  tests.map((testname)=>console.log(testname))
  return (
    <>{loading ? (
       <p></p>
    ) : (
      <div className={classes.main}>
      <div className="container mt-5">
        <div className="row mt-5">
          <h1 className="col-sm-12 text-capitalize text-center card-header">
            Tests
          </h1>{tests.map(({testname, testid, subname, testtime}) => (
          <div className="col-sm-4 mb-4 mt-3">
            
              <Card className={classes.root} variant="outlined" key ={testid}>
                <CardContent>
                  <Typography
                    className={classes.title}
                    variant="h5"
                    component="h4"
                    gutterBottom
                  >
                    Test Name : {testname}
                  </Typography>
                  <Typography color="textSecondary" className={classes.data}>
                    Subject :  {subname}
                  </Typography>
                  <Typography color="textSecondary" className={classes.data}>
                    Ends On : {testtime} min
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    className="text-center"
                    variant="outlined"
                    color="primary"
                    fullWidth
                  >
                    Start
                  </Button>
                </CardActions>
              </Card>
         
          </div>   ))}
        </div>
      </div>
      </div>)}
    </>
  );
};

