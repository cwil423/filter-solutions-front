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
      <Delivery name='Cole Williamson' address={{Line1: "65 Ocean Dr.", City: "Half Moon Bay", CountrySubDivisionCode: "CA"}}/> 
      {/* <Login /> */}
    </div>
   );
}
 
export default Deliveries;