import React, {useState} from 'react';
import classes from './Delivery.module.css';
import Checkbox from '../../../Components/UI/Checkbox/Checkbox';
import Axios from 'axios';
import Button from '@material-ui/core/Button';

const Delivery = (props) => {
  const [completionStatus, setCompletionStatus] = useState(false);

  const readableAddress = `${props.address.Line1} ${props.address.City} ${props.address.CountrySubDivisionCode}`;

  const onCompleteHandler = () => {
    setCompletionStatus(true)
      Axios.post('http://localhost:4000/mongoDb', {
        name: props.name,
        address: readableAddress
      }).then(response => console.log(response))
  }

  return ( 
    <div className={classes.delivery}>
      <div className={classes.name}>
        {`${props.name}: ${readableAddress}`}
      </div>
      <Button variant='contained' color='primary' className={classes.confirm} onClick={onCompleteHandler}>Confirm Delivery</Button>
      <div className={classes.checkbox} >
        <Checkbox completed={completionStatus}/>
      </div>
      
    </div>
   );
}
 
export default Delivery;