import React, { useState, useEffect } from 'react';
import './App.css';
import Deliveries from './Containers/Deliveries/Deliveries';
import Axios from 'axios';
// import ComboBox from './Containers/CustomerSelector/CustomerSelector';
import CustomerSelector from './Containers/CustomerSelector/CustomerSelector';
import { useDispatch, useSelector } from 'react-redux';
import Header from './Components/UI/Header/Header';
import { CircularProgress, CssBaseline } from '@material-ui/core';
import classes from './App.css';
// import { Modal } from '@material-ui/core';




function App() {
  const [selectingCustomers, setSelectingCustomers] = useState(true)

  const dispatch = useDispatch();
  const customerOrder = useSelector(state => state.customerOrder)
  
  useEffect(() => {
    console.log('app rendered')
  });

  const customersSelectedHandler = () => {
    setSelectingCustomers(false)
  }

  let content = <CustomerSelector onSubmit={customersSelectedHandler}/>
  if (selectingCustomers === false) {
    if (customerOrder.length == 0) {
      content = (
        <div className={'progress'}>
          <CircularProgress size='150px'/>
        </div>
      )
    } else {
      content = <Deliveries deliveries={customerOrder}/>
    }
  }
  
  return (
    <div className="App">
      <Header />
      {/* <Modal className={classes.modal}
        style={{ 
            width: '300px',
            height: '300px',
            position: 'absolute',
            left: '50%',
            top: '50%',
            marginLeft: '-150px',
            marginTop: '-150px'
        }}
        BackdropProps='open'
        open
        >
        <h1>Modal</h1>
      </Modal> */}

      {content}
      {/* <Deliveries deliveries={[]}/> */}
    </div>
  );
}

export default App;
