import React from 'react';
import { AccordionActions } from '@material-ui/core';

const initialState = {
  customersToBeDeliveredTo: [],
  allCustomers: [],
  customerOrder: []

};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'ADD_CUSTOMER':
      return {
        ...state,
        customersToBeDeliveredTo: action.newNames,
        
      };
    case 'ALL_CUSTOMERS':
      return {
        ...state,
        allCustomers: action.allCustomers
      };
    case 'SET_CUSTOMER_ORDER':
      return {
        ...state,
        customerOrder: action.order
      };
    case 'REMOVE_CUSTOMER':
      return {
        ...state,
        customersToBeDeliveredTo: action.customers
      };
  }
  return state;
}

export default reducer;