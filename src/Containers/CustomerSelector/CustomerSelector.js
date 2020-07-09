/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useSelector, useDispatch } from 'react-redux'
import { Button } from '@material-ui/core';

export default function ComboBox(props) {
  // const [value, setValue] = useState(options[0]);
  // const [inputValue, setInputValue] = useState('')
  const [names, setNames] = useState(['Cole'])

  const dispatch = useDispatch();
  const masterCustomers = useSelector(state => state.masterCustomers)

  useEffect(() => {
    console.log('render')
  })

  const getStateHandler = () => {
    console.log(names)
  }
  
  const updateStoreHandler = () => {
    dispatch({type: 'ADD_CUSTOMER', newNames: names})
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
        newNames.push(newValue.name)
        setNames(newNames)
        
      }}
      renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
    />
    <h1 onClick={getStateHandler}>Names</h1>
    <ol>
      {names.map(name => <li>{name}</li>)}
    </ol>
    <h1>Store: {masterCustomers.map(name => <li>{name}</li>)}</h1>
    <Button variant='contained' color='primary' onClick={updateStoreHandler}> BLAH</Button>

    </React.Fragment>
    
  );
}
