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
import { Loading } from "../Loading";
import UpdateLink from "./UpdateLink";

const useStyles = makeStyles({
  list: {
    width: 600,
  },
  fullList: {
    width: "auto",
  },
  loader: {
    width: "auto",
  },
});

export default function ViewLink() {
  const [{ links, loading }, dispatch] = useAuthState();
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false,
  });
console.log(links)
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
        { loading ? (<Loading />) : (links.map(({ link, linkid, linktitle }) =>
            <UpdateLink key={linkid} ilink={link} ilinktitle={linktitle} ilinkid={linkid}/>
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
          <ListItemText primary={"View Links"} />
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

