import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

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
  data: {
    padding: theme.spacing(1),
    marginBottom: 12,
  },
}));
const Tcard = () => {
  const classes = useStyles();

  return (
    <>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography
            className={classes.title}
            variant="h5"
            component="h4"
            gutterBottom
          >
            Test Name
          </Typography>
          <Typography color="textSecondary" className={classes.data}>
            Subject : Python
          </Typography>
          <Typography color="textSecondary" className={classes.data}>
            Ends On : 01/12/2020
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
    </>
  );
};
export const TestCard = () => {
  return (
    <>
      <div className="col-sm-4 mb-4 mt-3">
        <Tcard />
      </div>
      <div className="col-sm-4 mb-4 mt-3">
        <Tcard />
      </div>
      <div className="col-sm-4 mb-4 mt-3">
        <Tcard />
      </div>
    </>
  );
};
