import React from 'react';
import classes from './ListDisplay.module.css';
import Button from '@material-ui/core/Button';

const ListDisplay = (props) => {

  return ( 
    <div>
      <ol component='nav' className={classes.root}>
        {props.data.map((name, index) => (
          <li key={index}>
            <div 
              className={classes.listItem}>
              {name.name}
            </div>
            <Button 
              className={classes.removeButton} 
              variant='contained' color='secondary' 
              size='small'
              onClick={() => props.onRemove(index)}>
              Remove
            </Button>
          </li>))}
      </ol>
    </div>
   );
}
 
export default ListDisplay;