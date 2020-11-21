import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import {
  CssBaseline,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import HomeIcon  from "@material-ui/icons/Home";
import MenuTwoToneIcon from '@material-ui/icons/MenuTwoTone';
import CreateIcon from "@material-ui/icons/Create";
import VisibilityIcon from "@material-ui/icons/Visibility";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SettingsIcon from "@material-ui/icons/Settings";
import QueueIcon from "@material-ui/icons/Queue";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateSub from '../CreateSub';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexGrow: 1,
  },
  data: {
    display: "flex",
    flexWrap: "wrap",
    textAlign: "center",

    "& > *": {
      margin: theme.spacing(3),
      width: theme.spacing(60),
      height: theme.spacing(20),
    },
  },

  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },

  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function DashboardData() {
  const classes = useStyles();
  const theme = useTheme();

  const [open, setOpen] = React.useState(false);
  const [dialog, setDialog] = React.useState(false);

  const handleClickOpen = () => {
    setDialog(true);
  };

  const handleClose = () => {
    setDialog(false);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuTwoToneIcon/>
          </IconButton>
          <Typography variant="h6" noWrap>
            Welcome Sub_admin
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <CreateIcon />
            </ListItemIcon>
            <ListItemText primary={"Create Test"} />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <VisibilityIcon />
            </ListItemIcon>
            <ListItemText primary={"View Test"} />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <QueueIcon />
            </ListItemIcon>
            <ListItemText primary={"Create Subject"} />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary={"Settings"} />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary={"Logout"} />
          </ListItem>
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <div className="container">
          <div className={classes.data}>
            <Paper elevation={3}>
              <Typography
                className={classes.title}
                color="textPrimary"
                gutterBottom
              >
                Create Test for specific subject
              </Typography>
              <Button
                className={classes.btn}
                variant="outlined"
                color="primary"
                onClick={handleClickOpen}
                href="/createtest"
              >
                Create Test
              </Button>
            </Paper>

            <Paper elevation={3}>
              <Typography
                className={classes.title}
                color="textPrimary"
                gutterBottom
              >
                View Test for specific subjects
              </Typography>
              <Button
                className={classes.btn}
                variant="outlined"
                color="primary"
                onClick={handleClickOpen}
              >
                Take Test
              </Button>
            </Paper>
            <Paper elevation={3}>
              <Typography
                className={classes.title}
                color="textPrimary"
                gutterBottom
              >
                Create Subjects
              </Typography>
             <CreateSub/>
            </Paper>

            <Paper elevation={3}>
              <Typography
                className={classes.title}
                color="textPrimary"
                gutterBottom
              >
                Create Test for specific subject
              </Typography>
              <Button
                className={classes.btn}
                variant="outlined"
                color="primary"
                onClick={handleClickOpen}
                href="/createtest"
              >
                Create Test
              </Button>
            </Paper>

            <Paper elevation={3}>
              <Typography
                className={classes.title}
                color="textPrimary"
                gutterBottom
              >
                Create Test for specific subject
              </Typography>
              <Button
                className={classes.btn}
                variant="outlined"
                color="primary"
                onClick={handleClickOpen}
                href="/createtest"
              >
                Create Test
              </Button>
            </Paper>

            <Paper elevation={3}>
              <Typography
                className={classes.title}
                color="textPrimary"
                gutterBottom
              >
                Create Test for specific subject
              </Typography>
              <Button
                className={classes.btn}
                variant="outlined"
                color="primary"
                onClick={handleClickOpen}
                href="/createtest"
              >
                Create Test
              </Button>
            </Paper>
          </div>

          <div>
            <Dialog
              open={dialog}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Instructions for the test"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Let Google help apps determine location. This means sending
                  anonymous location data to Google, even when no apps are
                  running.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button href="subadmindashboard" color="primary">
                  Back
                </Button>
                <Button href="/testview" color="primary" autoFocus>
                  Start
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </main>
    </div>
  );
}
