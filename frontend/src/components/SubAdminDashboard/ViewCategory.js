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
import UpdateCategory from './UpdateCategory'
import Skeleton from "@material-ui/lab/Skeleton";
import { Loading } from "../Loading";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  loader: {
    width: "auto",
  },
});

export default function ViewCategory() {
  const [{ categories, loading }, dispatch] = useAuthState();
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };
  console.log(categories)
  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
    >
      <List>
        { loading ? (<Loading />) : (categories.map(({ categoryName, categoryid }, index) =>
            <UpdateCategory key={index} categoryName={categoryName} categoryid={categoryid} />
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
          <ListItemText primary={"View Category"} />
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

function Loader() {
  const classes = useStyles();
  return (
    <div className={classes.loader}>
      <Skeleton variant="rect" height={25} />
      <br />
      <Skeleton variant="rect" height={25} />
      <br />
      <Skeleton variant="rect" height={25} />
      <br />
      <Skeleton variant="rect" height={25} />
      <br />
      <Skeleton variant="rect" height={25} />
      <br />
      <Skeleton variant="rect" height={25} />
      <br />
      <Skeleton variant="rect" height={25} />
      <br />
      <Skeleton variant="rect" height={25} />
      <br />
      <Skeleton variant="rect" height={25} />
      <br />
    </div>
  );
}
