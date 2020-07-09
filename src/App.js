import React, { useState } from 'react';
import './App.css';
import Deliveries from './Containers/Deliveries/Deliveries';
import Axios from 'axios';
import ComboBox from './Components/UI/ComboBox/ComboBox';
import CustomerSelector from './Containers/CustomerSelector/CustomerSelector';



function App() {
  const [authToken, setAuthToken] = useState();
  const [deliveries] = useState([
    {name: 'Delivery 1'},
    {name: 'Delivery 2'},
    {name: 'Delivery 3'}
  ]);
  const [customers, setCustomers] = useState([]);

  
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
    // Axios.post('http://localhost:4000/apiCall', authToken)
    //   .then((response) => console.log(response))
    let responseData = null
    let customerData = null
    Axios({
      method: 'post',
      url: 'http://localhost:4000/apiCall',
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

    // }).then(response => setCustomers(response.data.Customer))
  })}

  return (
    <div className="App">
      {/* <Deliveries deliveries={deliveries}/> */}
      <button onClick={cookieHandler}>Get cookie</button>
      <button onClick={logStateHandler}>log state</button>
      <button onClick={apiCallHandler}>make api call</button>
      {/* <ComboBox customers={customers}/> */}
      <CustomerSelector customers={customers}/>


      
      


    </div>
  );
}

export default App;
