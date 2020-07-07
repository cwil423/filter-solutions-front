import React from 'react';
import Delivery from './Delivery/Delivery';
import Login from '../Login/Login';

const Deliveries = (props) => {
  const deliveries = props.deliveries.map((delivery) => {
    return <li className={'list-group-item'}><Delivery key={Math.random()} name={delivery.name} className={'list-group-item'}/></li>
  })
  return ( 
    <div>
      <ul className={'list-group'}>
        {deliveries}
      </ul>
      {/* <Login /> */}
    </div>
   );
}
 
export default Deliveries;