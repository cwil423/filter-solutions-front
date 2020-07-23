import React from 'react';
import Delivery from './Delivery/Delivery';
import classes from './Deliveries.module.css';

const Deliveries = (props) => {

  const deliveries = props.deliveries.map((delivery) => {
    return <Delivery key={Math.random()} name={delivery.name} address={delivery.address} className={'list-group-item'}/>
  })
  return ( 
    <div className={classes.deliveries}>
      {deliveries}
    </div>
   );
}
 
export default Deliveries;