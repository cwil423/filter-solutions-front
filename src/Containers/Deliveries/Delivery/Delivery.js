import React, {useState} from 'react';
import classes from './Delivery.module.css';
import Axios from 'axios';
import Button from '@material-ui/core/Button';
import Checkbox2 from '@material-ui/core/Checkbox';
import ConfirmDelivery from './ConfirmDelivery/ConfirmDelivery';


const Delivery = (props) => {
  
  const [doubleConfirming, setDoubleConfirming] = useState(false)

  const readableAddress = `${props.address.Line1} ${props.address.City} ${props.address.CountrySubDivisionCode}`;



  const doubleConfirmHandler = () => {
    setDoubleConfirming(true)
  }


  return ( 
    <div className={classes.delivery}>
      <div className={classes.name}>
        {`${props.name}: ${readableAddress}`}
      </div>
      <div className={classes.confirm}>
        <ConfirmDelivery readableAddress={readableAddress}/>
      </div>
      
      
    </div>
   );
}
 
export default Delivery;