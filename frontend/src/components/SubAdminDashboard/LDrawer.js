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

function LDrawer() {
    const classes = useStyles();
    const theme = useTheme();
  
    const [open, setOpen] = React.useState(false);
    const [dialog, setDialog] = React.useState(false);
  
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
    <div >
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
    </div>
  );
}

export default LDrawer;
