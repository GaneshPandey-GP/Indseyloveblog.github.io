import React from 'react';
import clsx from 'clsx';
import { List, ListItem, Drawer, ListItemText, ListItemIcon, makeStyles} from '@material-ui/core';
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { useAuthState } from '../../context';
import UpdateSub from './UpdateSub'

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
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false,
  });


  const toggleDrawer = (anchor, open) => (event) => {
    // if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
    //   return;
    // }
    setState({ ...state, [anchor]: open });
  };


  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      // onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {subjects.map(({subname, subid}) => 
          <UpdateSub key={subid} subname={subname} subid={subid}/>
        )}
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

