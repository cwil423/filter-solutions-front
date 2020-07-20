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
      {content}
      {/* <Deliveries deliveries={[]}/> */}
    </div>
  );
}

export default App;
