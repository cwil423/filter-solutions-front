/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useSelector, useDispatch } from 'react-redux'
import { Button } from '@material-ui/core';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Card from '@material-ui/core/Card';
import Axios from 'axios'
import ListDisplay from '../../Components/UI/ListDisplay/ListDisplay';
import classes from './CustomerSelector.module.css';


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
  
  const getMapquestHandler = () => {
    Axios({
      method: 'post',
      url: 'http://localhost:4000/mapquest',
      data: customersToBeDeliveredTo
    }).then(response => {
      const route = response.data.route.locationSequence;
      let stopOrder = [];
      route.forEach(element => {
        stopOrder.push(customersToBeDeliveredTo[element])
      })
      dispatch({type: 'SET_CUSTOMER_ORDER', order: stopOrder})
    })
    props.onSubmit()
  }

  return (
    <div className={classes.customerSelector}>
      <Card className={classes.card}>
        <ButtonGroup color='primary'>
          <Button variant='contained' onClick={cookieHandler} style={{width: 200, height: 50}}>Get Authorization</Button>
          <Button variant='contained' onClick={apiCallHandler} style={{width: 200, height: 50}} disabled={authToken == null}>Get Customers</Button>
        </ButtonGroup>
        <Autocomplete
          id="combo-box-demo"
          options={customers}
          getOptionLabel={(option) => option.name}
          style={{ width: 450, margin: 20 }}
          onChange={(event, newValue) => {
            let newNames = [...customersToBeDeliveredTo]
            if (newValue != null) {
              newNames.push(newValue)
              dispatch({type: 'ADD_CUSTOMER', newNames: newNames})
            }
            console.log(newNames)
          }}
          renderInput={(params) => <TextField {...params} label="Enter Customer Names Here" variant="outlined" />}
        />
        <ListDisplay title={'Deliveries'} data={customersToBeDeliveredTo} />
        <Button variant='contained' color='primary' style={{width: 200, height: 50}} onClick={getMapquestHandler} disabled={customersToBeDeliveredTo.length == 0}>Confirm Deliveries</Button>
      </Card>
    </div>
  );
}
