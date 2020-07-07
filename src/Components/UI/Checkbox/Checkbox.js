import React from 'react';
import classes from './Checkbox.module.css';

const Checkbox = (props) => {
  let checkmark = null
  if (props.completed === true) {
    checkmark = <span>&#10003;</span>
  } 

  return ( 
    <div className={classes.checkbox}>
      {checkmark}
    </div>
   );
}
 
export default Checkbox;