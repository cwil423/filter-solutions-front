/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useSelector, useDispatch } from 'react-redux'
import { Button } from '@material-ui/core';
import Axios from 'axios'
import ListDisplay from '../../Components/UI/ListDisplay/ListDisplay';

export default function ComboBox(props) {
  // const [value, setValue] = useState(options[0]);
  // const [inputValue, setInputValue] = useState('')
  const [names, setNames] = useState([])
  const [authToken, setAuthToken] = useState();
  const [customers, setCustomers] = useState([]);

  const dispatch = useDispatch();
  const customersToBeDeliveredTo = useSelector(state => state.customersToBeDeliveredTo)
  const customerOrder = useSelector(state => state.customerOrder)

  useEffect(() => {
    console.log('customer selector rendered')
  })

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

  const updateStoreHandler = () => {
    dispatch({type: 'ADD_CUSTOMER', newNames: names})
  }
  
  const getMapquestHandler = () => {
    Axios({
      method: 'post',
      url: 'http://localhost:4000/mapquest',
      data: customersToBeDeliveredTo
    // }).then(response => console.log(response.data))
    }).then(response => {
      const route = response.data.route.locationSequence;
      let stopOrder = [];
      // dispatch({type: 'SET_CUSTOMER_ORDER', customerOrder: })
      route.forEach(element => {
        stopOrder.push(customersToBeDeliveredTo[element])
      })
      console.log(route)
      console.log('Stop Order ', stopOrder)
      dispatch({type: 'SET_CUSTOMER_ORDER', order: stopOrder})
    })
  }

  return (
    <React.Fragment>
    <Button variant='contained' color='primary' onClick={cookieHandler}>Get cookie</Button>
    <Button variant='contained' color='primary' onClick={apiCallHandler}>make api call</Button>
    <Autocomplete
      id="combo-box-demo"
      options={customers}
      getOptionLabel={(option) => option.name}
      style={{ width: 300, margin: 10 }}
      onChange={(event, newValue) => {
        let newNames = names.map(name => name)
        if (newValue != null) {
          newNames.push(newValue)
          setNames(newNames)
        }
        console.log(newNames)
      }}
      renderInput={(params) => <TextField {...params} label="Enter Customer Names Here" variant="outlined" />}
    />
    <ListDisplay title={'Deliveries'} data={names} />
    <ListDisplay title={'Delivery Order'} data={customerOrder} />
    <Button variant='contained' color='primary' onClick={updateStoreHandler}>Confirm Deliveries</Button>
    <Button variant='contained' color='primary'  onClick={getMapquestHandler}>Det delivery Order</Button>
    
    <Button variant='contained' color='primary' onClick={props.onSubmit}>Change to Deliveries</Button>
    </React.Fragment>
  );
}
