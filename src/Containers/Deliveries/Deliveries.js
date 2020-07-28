import React, { useState } from 'react';
import Delivery from './Delivery/Delivery';
import classes from './Deliveries.module.css';
import ConfirmationModal from '../../Components/UI/ConfirmationModal/ConfirmationModal';

const Deliveries = (props) => {
  const [modalOpen, setModalOpen] = useState(false);

  const modalCloseHandler = (confirmation) => {
    setModalOpen(false);
    if (confirmation) {
      window.location.reload()
    }
  }

  const deliveries = props.deliveries.map((delivery, index) => {
    return <Delivery key={index} name={delivery.name} address={delivery.address} className={'list-group-item'}/>
  })
  
  return ( 
    <React.Fragment>
      <div className={classes.deliveries}>
        {deliveries}
      </div>
      <div className={classes.buttonAndModal}>
        <ConfirmationModal
            modal={modalOpen} 
            modalOpen={() => setModalOpen(true)}
            modalClose={modalCloseHandler} 
            title={"Route confirmation"}
            text={'Complete route and return to main page?'}
            hasButton={true}
            hasCancelButton={true}
            buttonText={'Complete Route'}
            buttonSize='large'/>
      </div>
    </React.Fragment>
   );
}
 
export default Deliveries;