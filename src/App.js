import React, { useState } from 'react';
import './App.css';
import Deliveries from './Containers/Deliveries/Deliveries';
import Axios from 'axios';
// import ComboBox from './Containers/CustomerSelector/CustomerSelector';
import CustomerSelector from './Containers/CustomerSelector/CustomerSelector';
import { useDispatch, useSelector } from 'react-redux';



function App() {
  const [authToken, setAuthToken] = useState();
  const [customers, setCustomers] = useState([]);

  const dispatch = useDispatch();
  const allCustomers = useSelector(state => state.allCustomers)
  const masterCustomers = useSelector(state => state.masterCustomers)
  const customerOrder = useSelector(state => state.customerOrder)

  
  const cookieHandler = () => {
    Axios.get('http://localhost:4000')
      .then(() => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${'secondcookie'}=`);
        if (parts.length === 2) setAuthToken({
          token: parts.pop().split(';').shift()
        });
      })
  }

  const logStateHandler = () => {
    console.log(authToken)
    console.log(customers)
  }

  const apiCallHandler = () => {
    let responseData = null
    let customerData = null
    Axios({
      method: 'post',
      url: 'http://localhost:4000/quickbooks',
      data: authToken
    }).then(response => {
      responseData = response.data.Customer
    customerData = responseData.map((cust) => {
      return(
        {
          name: cust.DisplayName,
          address: cust.BillAddr
        }
        )
    })
    setCustomers(customerData)
    dispatch({type: 'ALL_CUSTOMERS', allCustomers: customerData})

  })}


  
  return (
    <div className="App">
      {/* <Deliveries deliveries={deliveries}/> */}
      <button onClick={cookieHandler}>Get cookie</button>
      <button onClick={logStateHandler}>log state</button>
      <button onClick={apiCallHandler}>make api call</button>
      {/* <ComboBox customers={customers}/> */}
      <CustomerSelector customers={customers}/>
      <button onClick={() => console.log(customerOrder)}>Get Customer Order</button>
      
      


      
      


    </div>
  );
}

export default App;
