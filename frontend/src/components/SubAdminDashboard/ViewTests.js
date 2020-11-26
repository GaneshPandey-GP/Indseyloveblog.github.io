import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { useAuthState } from "../../context";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    height: 225,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function ViewTests() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [{tests}, dispatch] = useAuthState()
console.log(tests)
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        {tests.map((test) => (
            <Tab label={test.testname} key={test.testid} {...a11yProps(test.testid)} />
        ))}
        {/* <Tab label="Item One" {...a11yProps(0)} />
        <Tab label="Item Two" {...a11yProps(1)} />
        <Tab label="Item Three" {...a11yProps(2)} />
        <Tab label="Item Four" {...a11yProps(3)} />
        <Tab label="Item Five" {...a11yProps(4)} />
        <Tab label="Item Six" {...a11yProps(5)} />
        <Tab label="Item Seven" {...a11yProps(6)} /> */}
      </Tabs>
      {tests.map((test) => (
        <SubjectPanel value={test.testname} key={test.testid} index={test.testid}>
            {test.testname}
        </SubjectPanel>
      ))}

      {/* <SubjectPanel value={value} index={1}>
        Item Two
      </SubjectPanel>
      <SubjectPanel value={value} index={2}>
        Item Three
      </SubjectPanel>
      <SubjectPanel value={value} index={3}>
        Item Four
      </SubjectPanel>
      <SubjectPanel value={value} index={4}>
        Item Five
      </SubjectPanel>
      <SubjectPanel value={value} index={5}>
        Item Six
      </SubjectPanel>
      <SubjectPanel value={value} index={6}>
        Item Seven
      </SubjectPanel> */}
    </div>
  );
}

function SubjectPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-subjectPanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-subjectPanel-${index}`,
  };
}

SubjectPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
