import React, { useState } from 'react';
import Delivery from './Delivery/Delivery';
import classes from './Deliveries.module.css';
import { Button } from '@material-ui/core';
import Modal from '../../Components/UI/Modal/Modal';

const Deliveries = (props) => {
  const [showModal, setShowModal] = useState(false);

  const completeRouteHandler = () => {
    setShowModal(false);
    window.location.reload()
  }

  const deliveries = props.deliveries.map((delivery) => {
    return <Delivery key={Math.random()} name={delivery.name} address={delivery.address} className={'list-group-item'}/>
  })
  return ( 
    <React.Fragment>
      <div className={classes.deliveries}>
        {deliveries}
      </div>
      <div className={classes.buttonAndModal}>
        <Modal 
          show={showModal}>
          Complete route and return to main page?
          <Button 
            onClick={() => setShowModal(false)}
            color='primary'>
            Cancel
          </Button>
          <Button 
            color='primary'
            onClick={completeRouteHandler}>
            Confirm
          </Button>
        </Modal>
        <Button
          className={classes.routeCompleteButton}
          variant='contained' 
          color='primary'
          onClick={() => setShowModal(true)}>
          Complete Route
        </Button>
      </div>
    </React.Fragment>
    
      

    
    
   );
}
 
export default Deliveries;