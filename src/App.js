import React, { useState } from 'react';
import './App.css';
import Deliveries from './Containers/Deliveries/Deliveries';
import Axios from 'axios';


function App() {
  const [authToken, setAuthToken] = useState();
  const [deliveries] = useState([
    {name: 'Delivery 1'},
    {name: 'Delivery 2'},
    {name: 'Delivery 3'}
  ]);
  const [customers, setCustomers] = useState();
  const customers_1 = [
    'Cole', 'Becky', 'Robert', 'Amanda', 'Anna'
  ]
  
  
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
    Axios({
      method: 'post',
      url: 'http://localhost:4000/apiCall',
      data: authToken
    }).then(response => setCustomers(response.data.Customer))
  }

  return (
    <div className="App">
      {/* <Deliveries deliveries={deliveries}/> */}
      <button onClick={cookieHandler}>Get cookie</button>
      <button onClick={logStateHandler}>log state</button>
      <button onClick={apiCallHandler}>make api call</button>
      <form autoComplete='off'>
        <div classname='autocomplete'>
          <input placeholder='Customer'/>

        </div>

      </form>
      


    </div>
  );
}

export default App;
