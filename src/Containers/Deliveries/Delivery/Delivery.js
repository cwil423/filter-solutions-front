import React, {useState} from 'react';
import classes from './Delivery.module.css';
import Checkbox from '../../../Components/UI/Checkbox/Checkbox';
import Axios from 'axios';
import Button from '@material-ui/core/Button';

const Delivery = (props) => {
  const [completionStatus, setCompletionStatus] = useState(false);

  const onCompleteHandler = () => {
    setCompletionStatus(true)
    // Axios.get('https://sandbox-quickbooks.api.intuit.com/v3/company/4620816365064691660/customer/1?minorversion=51')
    //   .then(response => console.log(response))
    // navigator.geolocation.getCurrentPosition((position) => {
    //   console.log(position)
    //   Axios.post('http://localhost:4000/', {
    //     name: 'Joel',
    //     lat: position.coords.latitude,
    //     lng: position.coords.longitude
    //   })
    // }, null, {enableHighAccuracy: true})
  }

  return ( 
    <div className={classes.delivery}>
      <div className={classes.name}>
        {props.name}
      </div>
      <Button variant='contained' color='primary' className={classes.confirm} onClick={onCompleteHandler}>Confirm Delivery</Button>
      <div className={classes.checkbox} >
        <Checkbox completed={completionStatus}/>
      </div>
      
    </div>
   );
}
 
export default Delivery;