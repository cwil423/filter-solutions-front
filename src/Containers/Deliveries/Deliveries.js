import React from 'react';
import Delivery from './Delivery/Delivery';
import Login from '../Login/Login';

const Deliveries = (props) => {
  const deliveries = props.deliveries.map((delivery) => {
    return <Delivery key={Math.random()} name={delivery.name} address={delivery.address} className={'list-group-item'}/>
  })
  return ( 
    <div>
      {deliveries}
      {/* <Login /> */}
    </div>
   );
}
 
export default Deliveries;