import React, { useReducer, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import { ListItemIcon } from '@material-ui/core';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { initialState, reducer } from '../../context/reducer';
import { getSubjects } from '../../context/actions';
import { useAuthState } from '../../context';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function ViewSubjects() {
  const [{subjects}, dispatch] = useAuthState()
  // const {subjects} = useAuthState()
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false,
  });

  useEffect(() => {
    getSubjects(dispatch)
  }, [dispatch])


  console.log(subjects)
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {subjects.map((text, index) => (
          <ListItem button key={index}>
            <ListItemText primary={text} />
            <EditOutlinedIcon />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
        <React.Fragment key={'right'}>
            <ListItem button onClick={toggleDrawer('right', true)}>
                <ListItemIcon>
                    <LibraryBooksIcon />
                </ListItemIcon>
                <ListItemText primary={"View Subjects"} />
            </ListItem>
          <Drawer anchor={'right'} open={state['right']} onClose={toggleDrawer('right', false)}>
            {list('right')}
          </Drawer>
        </React.Fragment>
    </div>
  );
}
