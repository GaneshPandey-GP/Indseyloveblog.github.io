import React from "react";
import clsx from "clsx";
import {
  List,
  ListItem,
  Drawer,
  ListItemText,
  ListItemIcon,
  makeStyles,
} from "@material-ui/core";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import { useAuthState } from "../../context";
import UpdateSub from "./UpdateSub";
import { Loading } from "../Loading";

const useStyles = makeStyles({
  list: {
    width: 280,
  },
  fullList: {
    width: "auto",
  },
  loader: {
    width: "auto",
  },
});

export default function ViewSubjects() {
  const [{ subjects, loading }, dispatch] = useAuthState();
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
    >
      <List>
        { 
          loading ? (<Loading />) : (subjects.map(({ subname, subid, categoryid, isActive }) =>
          isActive === 1 ?
          <UpdateSub key={subid} subname={subname} subid={subid} categoryid={categoryid}/> : <span key={subid}></span>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <React.Fragment key={"right"}>
        <ListItem button onClick={toggleDrawer("right", true)}>
          <ListItemIcon>
            <LibraryBooksIcon />
          </ListItemIcon>
          <ListItemText primary={"View Subjects"} />
        </ListItem>
        <Drawer
          anchor={"right"}
          open={state["right"]}
          onClose={toggleDrawer("right", false)}
        >
          {list("right")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}

