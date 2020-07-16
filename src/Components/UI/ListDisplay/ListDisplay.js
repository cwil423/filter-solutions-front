import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import classes from './ListDisplay.module.css'


const ListDisplay = (props) => {
  return ( 
    <div>
      <ol component='nav' className={classes.root}>
        {props.data.map(name => <li key={Math.random()} >{name.name}</li>)}
      </ol>
    </div>

   );
}
 
export default ListDisplay;