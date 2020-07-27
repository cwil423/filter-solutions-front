import React, { useState } from 'react';
import './App.css';
import Deliveries from './Containers/Deliveries/Deliveries';
import CustomerSelector from './Containers/CustomerSelector/CustomerSelector';
import { useSelector } from 'react-redux';
import Header from './Components/UI/Header/Header';
import { CircularProgress } from '@material-ui/core';




function App() {
  const [selectingCustomers, setSelectingCustomers] = useState(true)
  const customerOrder = useSelector(state => state.customerOrder)
  
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
      {content}
    </div>
  );
}

export default App;
