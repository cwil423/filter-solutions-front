import React, { useState, useEffect } from 'react';
import './App.css';
import Deliveries from './Containers/Deliveries/Deliveries';
import Axios from 'axios';
// import ComboBox from './Containers/CustomerSelector/CustomerSelector';
import CustomerSelector from './Containers/CustomerSelector/CustomerSelector';
import { useDispatch, useSelector } from 'react-redux';
import Header from './Components/UI/Header/Header';



function App() {
  // const [authToken, setAuthToken] = useState();
  // const [customers, setCustomers] = useState([]);
  const [selectingCustomers, setSelectingCustomers] = useState(true)

  const dispatch = useDispatch();
  const customerOrder = useSelector(state => state.customerOrder)
  
  useEffect(() => {
    console.log('app rendered')
  });

  const customersSelectedHandler = () => {
    setSelectingCustomers(false)
    console.log('it happened')
  }

  
  // const cookieHandler = () => {
  //   Axios.get('http://localhost:4000')
  //     .then(() => {
  //       const value = `; ${document.cookie}`;
  //       const parts = value.split(`; ${'secondcookie'}=`);
  //       if (parts.length === 2) setAuthToken({
  //         token: parts.pop().split(';').shift()
  //       });
  //     })
  // }

  // const logStateHandler = () => {
  //   console.log(authToken)
  //   console.log(customers)
  // }

  // const apiCallHandler = () => {
  //   let responseData = null
  //   let customerData = null
  //   Axios({
  //     method: 'post',
  //     url: 'http://localhost:4000/quickbooks',
  //     data: authToken
  //   }).then(response => {
  //     responseData = response.data.Customer
  //   customerData = responseData.map((cust) => {
  //     return(
  //       {
  //         name: cust.DisplayName,
  //         address: cust.BillAddr
  //       }
  //       )
  //   })
  //   setCustomers(customerData)
  //   dispatch({type: 'ALL_CUSTOMERS', allCustomers: customerData})

  // })}

  let content = <CustomerSelector onSubmit={customersSelectedHandler}/>
  if (selectingCustomers === false) {
    content = <Deliveries deliveries={customerOrder}/>
  }
  
  return (
    <div className="App">
      <Header />
      {content}
    </div>
  );
}

export default App;
