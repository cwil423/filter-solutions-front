/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useSelector, useDispatch } from 'react-redux'
import { Button } from '@material-ui/core';
import Axios from 'axios'

export default function ComboBox(props) {
  // const [value, setValue] = useState(options[0]);
  // const [inputValue, setInputValue] = useState('')
  const [names, setNames] = useState([])

  const dispatch = useDispatch();
  const customersToBeDeliveredTo = useSelector(state => state.customersToBeDeliveredTo)
  const customerOrder = useSelector(state => state.customerOrder)

  useEffect(() => {
    console.log('customer selector rendered')
  })

  const getStateHandler = () => {
    console.log(names)
  }
  
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
    <Autocomplete
      id="combo-box-demo"
      options={props.customers}
      getOptionLabel={(option) => option.name}
      style={{ width: 300 }}
      onChange={(event, newValue) => {
        let newNames = names.map(name => name)
        if (newValue != null) {
          newNames.push(newValue)
          setNames(newNames)
        }
        console.log(newNames)
        
        
      }}
      renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
    />
    <h1 onClick={getStateHandler}>Names</h1>
    <ol>
      {names.map(name => <li key={Math.random()}>{name.name}</li>)}
    </ol>
    <h1>Store: {customersToBeDeliveredTo.map(name => <li>{name.name}</li>)}</h1>
    <Button variant='contained' color='primary' onClick={updateStoreHandler}>Update Store</Button>
    <Button variant='contained' color='primary' onClick={getMapquestHandler}>Send to server and mapquest</Button>
    </React.Fragment>
    
  );
}
