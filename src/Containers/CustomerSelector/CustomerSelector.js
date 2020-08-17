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
import ConfirmationModal from '../../Components/UI/ConfirmationModal/ConfirmationModal';


export default function ComboBox(props) {
  const [authToken, setAuthToken] = useState();
  const [customers, setCustomers] = useState([]);
  const [rerender, setRerender] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const dispatch = useDispatch();
  const customersToBeDeliveredTo = useSelector(state => state.customersToBeDeliveredTo)

  const modalCloseHandler = () => {
    setModalOpen(false)
  }

  const getAccessToken = () => {
    Axios.get('https://routeappback.totalfiltersolutions.com/oauth/accessToken')
      .then(response => setAuthToken({token: response.data[0].value}))
  }

  const apiCallHandler = (letters) => {
    let responseData = null
    let customerData = null
    Axios({
      method: 'post',
      url: 'https://routeappback.totalfiltersolutions.com/quickbooks',
      data: [authToken, {letters: letters}]
    }).then(response => {
      responseData = response.data.Customer
      if(responseData) {
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
      }
  })}
  
  const getMapquestHandler = () => {
    const startingAdress = {
      name: 'start', 
      address: {
        Line1: '2218 Forsythe Ave.', 
        City: 'Monroe', 
        CountrySubDivisionCode: 'LA'
      }
    }
    const deliveriesWithStartAndFinish = [
      startingAdress,
      ...customersToBeDeliveredTo,
      startingAdress
    ]

    // Sends locations to mapquest and return the order of the deliveries.
    Axios({
      method: 'post',
      url: 'https://routeappback.totalfiltersolutions.com/mapquest',
      data: deliveriesWithStartAndFinish
    }).then(response => {
      const route = response.data.route.locationSequence;
      let stopOrder = [];

      // Puts the customer list in the order returned by mapquest and then removes the start and end.
      route.forEach(element => {
        stopOrder.push(deliveriesWithStartAndFinish[element])
      })
      stopOrder.pop();
      stopOrder.shift();
      dispatch({type: 'SET_CUSTOMER_ORDER', order: stopOrder})
    })
    props.onSubmit()
  }

  const removeCustomerHandler = (index) => {
    let customers = customersToBeDeliveredTo;
    customers.splice(index, 1)
    dispatch({type: 'REMOVE_CUSTOMER', customers: customers})
    setRerender(!rerender)
  }

  return (
    <div className={classes.customerSelector}>
      <ConfirmationModal
            modal={modalOpen} 
            modalOpen={setModalOpen}
            modalClose={modalCloseHandler} 
            title={"Could not add customer"}
            text={'Customer has no address in QuickBooks.'}
            buttonText={'Complete Route'}
            buttonSize='large'/>
      <Card className={classes.card}>
        <a 
          className={classes.quickbooksButton}
          href={'https://routeappback.totalfiltersolutions.com/oauth'}>
        </a>
        <ButtonGroup color='primary'>
          <Button 
            variant='contained' 
            onClick={getAccessToken} 
            style={{width: 200, height: 50}}>
            Get Authorization
          </Button>
        </ButtonGroup>
        <Autocomplete
          id="combo-box-demo"
          options={customers}
          getOptionLabel={(option) => option.name}
          style={{ width: 450, margin: 20 }}
          onInputChange={(event, newInputValue) => {
            if (newInputValue != '') {
              let letters = newInputValue;
              letters.charAt(0).toUpperCase();
            apiCallHandler(letters);
            }
          }}
          onChange={(event, newValue) => {
            
            let newNames = [...customersToBeDeliveredTo];
            if (newValue != null) {
              if (newValue.address != null) {
                newNames.push(newValue)
                dispatch({type: 'ADD_CUSTOMER', newNames: newNames})
              } else {
                setModalOpen(true)
              }
            }
          }}
          renderInput={(params) => <TextField {...params} label="Enter Customer Names Here" variant="outlined" />}
        />
        <ListDisplay 
          title={'Deliveries'} 
          data={customersToBeDeliveredTo} 
          onRemove={removeCustomerHandler}
          removable={true}/>
        <Button 
          variant='contained' 
          color='primary' 
          style={{width: 200, height: 50}} 
          onClick={getMapquestHandler} 
          disabled={customersToBeDeliveredTo.length < 2}>
          Confirm Deliveries
        </Button>
        <button onClick={() => console.log(customersToBeDeliveredTo)}>Get state</button>
      </Card>
    </div>
  );
}
