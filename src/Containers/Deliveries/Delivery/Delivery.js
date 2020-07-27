import React, {useState} from 'react';
import classes from './Delivery.module.css';
import Axios from 'axios';
import Checkbox from '@material-ui/core/Checkbox';
import ConfirmationModal from '../../../Components/UI/ConfirmationModal/ConfirmationModal';


const Delivery = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [completionStatus, setCompletionStatus] = useState(false);

  const readableAddress = `${props.address.Line1} ${props.address.City} ${props.address.CountrySubDivisionCode}`;

  const modalOpenHandler = () => {
    setModalOpen(true)
  }

  const modalCloseHandler = (confirmation) => {
    setModalOpen(false)
    if (confirmation) {
      setCompletionStatus(true)
      Axios.post('http://localhost:4000/mongoDb', {
        name: props.name,
        address: readableAddress
      }).then(response => response)
    }
  }

  return ( 
    <div className={classes.delivery}>
      <div className={classes.name}>
        {`${props.name}: ${readableAddress}`}
      </div>
      <div className={classes.confirm}>
        <ConfirmationModal
          readableAddress={readableAddress} 
          modal={modalOpen} 
          modalOpen={modalOpenHandler}
          modalClose={modalCloseHandler} 
          completionsStatus={completionStatus}
          title={"Delivery confirmation."}
          text={`Confirm delivery to ${readableAddress}?`}
          buttonText={'Confirm Delivery'}
          buttonSize='medium'/>
      </div>
      <div className={classes.checkbox}>
        <Checkbox 
          className={classes.checkbox}
          disabled={!completionStatus} 
          checked={completionStatus}
          color="primary"
        />
      </div>
    </div>
   );
}
 
export default Delivery;