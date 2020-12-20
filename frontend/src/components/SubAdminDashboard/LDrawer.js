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
  Avatar,
  } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import MenuTwoToneIcon from "@material-ui/icons/MenuTwoTone";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonIcon from "@material-ui/icons/Person";
import CreateSub from "./CreateSub";
import ViewSubjects from "./ViewSubjects";
import CreateTest from "./CreateTest";
import { useAuthState } from "../../context";
import { NavLoading } from "../Loading";
import CreateCategory from "./CreateCategory";
import ViewCategory from "./ViewCategory";
import CreateLink from "./CreateLink";
import ViewLink from "./ViewLink";
import UpdateName from "./UpdateName";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
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
}));
function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

function LDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true)};
  const [{ loading, user}] = useAuthState()

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <div>
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
            <MenuTwoToneIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Welcome {user[0].fname} {user[0].lname}
          </Typography>
        </Toolbar>
        {loading ? <NavLoading /> : <></>}
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
        <List>
          <Avatar className="container">
            <PersonIcon />
          </Avatar>
          <UpdateName ifname={user[0].fname} ilname={user[0].lname}/>
          <Divider />
          <CreateCategory/>
          <CreateSub />
          <CreateLink />
          <CreateTest />
          
          <ViewCategory/>
          <ViewSubjects />
          <ViewLink />
        </List>
        <Divider />
        <List>
          <ListItem button>
          <ListItemLink href="/sub-admin-login">
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            
            <ListItemText primary={"Logout"} />
            </ListItemLink>
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}

export default LDrawer;
